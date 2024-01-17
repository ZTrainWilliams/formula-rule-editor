<!--
 * @Description: 富文本编辑器-公式编辑
-->

<template>
  <tinymce
    :id="curId"
    ref="ztTinymceRef"
    v-model="content"
    :config="config"
    :height="220"
    width="100%"
    class="tinymce-formula-main"
    @initInstanceCallback="initInstanceCallback"
  />
</template>

<script>
import { defineComponent, ref, computed, nextTick } from 'vue';
import { uniqueId } from 'lodash-es';
import tinymce from '@/components/Tinymce/src/index.vue';

export default defineComponent({
  components: { tinymce },
  props: {
    modelValue: {
      type: String,
      defualt: '',
    },
    // 富文本id
    id: {
      type: String,
      default: 'tinymce-formula',
    },
    // 操作符列表
    operatorList: {
      type: Array,
      default: () => [],
    },
    // 函数列表
    functionList: {
      type: Array,
      default: () => [],
    },
    // field-颜色
    color: {
      type: String,
      default: '#1C88E5',
    },
  },
  setup(props, { emit }) {
    const ztTinymceRef = ref(null);
    const curId = computed(() => uniqueId(props.id));
    const content = ref('');
    const config = ref({
      // 全部关闭
      toolbar: [],
      plugins: ['autoresize'],
      menubar: [],
      statusbar: false,
      // entities: false, // 正确处理不可见字符
      autoresize_bottom_margin: 20,
      autoresize_min_height: 100,
      autoresize_max_height: 500,
      content_style: `p {font-size: 14px} .mention-field{color: ${props.color}}`, // 重置部分样式，富文本使用iframe沙箱隔离
    });

    let contentInitStatus = false; // 内容未插入标记

    /**
     * @description: 创建range
     * @param {Element} container
     * @param {Number} offset
     * @return {*}
     */
    const toRange = (container, offset = 0) => {
      const range = document.createRange();
      range.setStart(container, offset);
      range.setEnd(container, offset);
      return range;
    };

    /**
     * @description: 富文本插入内容
     * @return {*}
     */
    const editorSetContent = () => {
      const editor = window.tinyMCE.editors[curId.value];
      editor.setContent(content.value, { noSelection: true });
      nextTick(() => {
        requestAnimationFrame(() => {
          const selectionEnd = editor.selection.getEnd();
          editor.selection.setRng(toRange(selectionEnd, selectionEnd.childNodes.length)); // 有效保证光标在最后显示
          editor.focus(); // 显示光标
        });
      });
      contentInitStatus = true;
    };

    /**
     * @description: 处理富文本内容，回调公式节点数组、文本
     * @return {*}
     */
    const contentChange = (val) => {
      const editor = window.tinyMCE?.editors[curId.value]; // 富文本实例
      if (!editor) return;
      const tempContainer = editor.getBody(); // 富文本节点内容
      const text = tempContainer.textContent;
      if (props.modelValue === text) return; // 内容全等不回调
      const childNodes = tempContainer.childNodes;
      const calcList = [];
      const regexText = props.operatorList.map((operator) => `\\${operator.value ?? operator}`).join('');
      const operatorRegex = new RegExp(`([${regexText}])`);
      const operatorSplitRegex = new RegExp(`([${regexText}])`);

      childNodes.forEach((p) => {
        p.childNodes.forEach((element) => {
          const classText = element.nodeType === 1 && element?.getAttribute ? element?.getAttribute('class') : '';
          const value = element.textContent;
          if (element.nodeType === 3) {
            if (value !== '') {
              calcList.push({
                type: 'text',
                value,
              });
            }
          } else if (classText && classText.indexOf('mention-field') !== -1) {
            if (value !== '') {
              calcList.push({
                type: 'field',
                value,
              });
            }
          } else if (classText && classText.indexOf('mention-operator') !== -1) {
            const operatorSplits = value.split(operatorRegex);
            operatorSplits.forEach((v) => {
              if (v !== '') {
                if (operatorSplitRegex.test(v)) {
                  calcList.push({
                    type: 'operator',
                    value: v,
                  });
                } else {
                  calcList.push({
                    type: 'text',
                    value: v,
                  });
                }
              }
            });
          } else {
            calcList.push({
              type: 'text',
              value,
            });
          }
        });
      });
      emit('changeHtmlContent', val);
      emit('change', calcList);
      emit('input:modelValue', text);
    };

    /**
     * @description: 富文本初始化
     * @return {*}
     */
    const initInstanceCallback = () => {
      const editor = window.tinyMCE.editors[curId.value];
      // 注册内容变更事件的回调函数
      editor.on('change', (val) => {
        // 在内容变更时执行的逻辑
        contentChange(val);
      });
      if (!contentInitStatus) {
        editorSetContent();
      }
    };

    /**
     * @description: 向富文本插入内容
     * @param {String} value
     * @param {String} type field、operator、function
     * @return {*}
     */
    const insertContent = ({ value, type, offset, offsetIdx }) => {
      const editor = window.tinyMCE.editors[curId.value];
      if (type === 'operator') {
        if (offset) {
          editor.insertContent(value);
          selectionSetRng(offsetIdx);
        } else {
          editor.insertContent(value);
          // editor.insertContent(`<span class="mention-${type}">${value}</span>`);
        }
      } else if (type === 'field') {
        editor.insertContent(`<span class="mention-${type}" contenteditable="false">${`#${value}#`}</span>`);
      } else {
        if (Object.prototype.toString.call(value) === '[object Array]') {
          for (let i = 0; i < value.length; i++) {
            editor.insertContent(value[i]);
          }
        } else {
          editor.insertContent(value);
        }
        offset && selectionSetRng(offsetIdx);
      }
      initInstanceCallback();
      editor.focus(); // 显示光标
    };

    /**
     * @description: 插入文本时改变光标位置
     * @param {Number} offsetIdx
     * @return {*}
     */
    const selectionSetRng = (offsetIdx) => {
      const editor = window.tinyMCE.editors[curId.value];
      // 获取当前选区的范围对象
      const range = editor.selection.getRng();
      // 获取光标位置的索引
      const caretIndex = range.startOffset;
      // 计算光标位置的偏移量
      const offsetIndex = caretIndex - 1;

      // 设置光标位置
      editor.selection.setRng({
        startContainer: range.startContainer,
        startOffset: offsetIdx ?? offsetIndex,
        endContainer: range.startContainer,
        endOffset: offsetIdx ?? offsetIndex,
      });
    };

    /**
     * @description: 解析公式文本，识别标签类型数据数组
     * @param {String} text 公式文本
     * @return {Array} tags
     */
    const splitTextToTags = (text) => {
      if (!text) {
        return [];
      }

      // 构建正则表达式
      const regexString = `([${props.operatorList
        .map((operator) => `\\${operator.value ?? operator}`)
        .join('|')}|${props.functionList.map((func) => `\\b${func.label}\\b`).join('|')}\\s])`;
      const regex = new RegExp(regexString);
      const texts = text.split(regex); // 以 /+-*/() 进行 split
      const operatorRegex = new RegExp(
        `[${props.operatorList.map((operator) => `\\${operator.value ?? operator}`).join('')}]`
      );

      // 初始化标签列表
      const tags = [];
      let inField = false; // 用于标记是否在处理 field 类型
      let currentField = ''; // 用于存储当前的 field 内容
      for (let i = 0; i < texts.length; i = i + 1) {
        const val = texts[i];
        if (val === '' || val === undefined) {
          continue;
        } else if (val.startsWith('#')) {
          // 如果是 # 开头的字符串，代表子项标签
          inField = true;
          currentField = val;
          if (val.endsWith('#')) {
            tags.push({
              type: 'field',
              value: val,
            });
            inField = false;
            currentField = '';
          }
        } else if (inField) {
          // 如果已经进入 field 类型，将当前内容添加到 currentField 中
          currentField += val;
          if (val.endsWith('#')) {
            tags.push({
              type: 'field',
              value: currentField,
            });
            inField = false;
            currentField = '';
          }
        } else if (operatorRegex.test(val)) {
          // 操作符
          tags.push({
            type: 'text',
            // type: 'operator',
            value: val,
          });
        } else {
          tags.push({
            type: 'text',
            value: val,
          });
        }
      }
      return tags;
    };

    /**
     * @description: 转换标签类型数据成为富文本数据
     * @param {Array} tags tag类型数组
     * @return {*}
     */
    const setTagsToElment = (tags) => {
      return tags
        .map((item) => {
          if (item.type === 'field') {
            return `<span class="mention-field" contenteditable="false">${item.value}</span>`;
          } else if (item.type === 'operator') {
            return `<span class="mention-operator">${item.value}</span>`;
          } else {
            return item.value;
          }
        })
        .join('');
    };

    /**
     * @description: 向富文本插入内容
     * @param {String} value 基础公式text
     * @return {*}
     */
    const setContent = (value) => {
      content.value = value;
      const tags = splitTextToTags(value);
      const elementValue = setTagsToElment(tags);
      content.value = elementValue;
      nextTick(() => {
        if (window.tinyMCE) {
          editorSetContent();
        } else {
          contentInitStatus = false; // 富文本未初始化-标记等待插入
        }
      });
    };

    return {
      ztTinymceRef,
      curId,
      content,
      config,
      contentChange,
      initInstanceCallback,
      insertContent,
      setContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.tinymce-formula-main {
  width: 100%;
}
</style>
