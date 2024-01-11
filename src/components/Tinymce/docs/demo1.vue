<!--
 * @Description: 编辑器-插入内容
-->

<template>
  <div>
    <div>
      <el-button @click="insertContent({ value: '作者', type: 'field' })">插入-feild</el-button>
      <el-button @click="insertContent({ value: '/', type: 'operator' })">插入-operator</el-button>
      <el-button @click="insertContent({ value: '插入内容' })">插入</el-button>
      <el-button @click="insertContent({ value: `''`, offset: true })">插入('')</el-button>
    </div>
    <ys-tinymce v-model="content" :id="id" :config="config" />
    <div class="editor-content">
      <div class="ec-left">
        <div class="title">输出源码</div>
        <div class="content">{{ content }}</div>
      </div>
      <div class="ec-right">
        <div class="title">输出预览</div>
        <div class="content" v-html="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref(
  // eslint-disable-next-line
  '<p><span class="mention-field" contenteditable="false">#实发工资合计#</span> <span class="mention-operator">+</span> <span class="mention-field" contenteditable="false">#个税合计#</span> <span class="mention-operator">+</span> <span class="mention-field" contenteditable="false">#社保公积金合计#</span> <span class="mention-operator">+</span> <span class="mention-field" contenteditable="false">#残保金合计#</span> <span class="mention-operator">+</span> <span class="mention-field" contenteditable="false">#商保合计#</span> <span class="mention-operator">+</span> <span class="mention-field" contenteditable="false">#税费合计#</span> <span class="mention-operator">+</span> <span class="mention-field" contenteditable="false">#服务费合计#</span></p>'
);
const id = ref('tinymce-formula-1');
const config = ref({
  toolbar: [],
  plugins: [],
  menubar: [],
  statusbar: false,
  content_style: `p {font-size: 14px} .mention-field{color : '#1C88E5'}`,
});

/**
 * @description: 向富文本插入内容
 * @param {String} value
 * @param {String} type field、operator
 * @return {*}
 */
const insertContent = ({ value, type, offset }) => {
  const editor = window.tinyMCE.editors[id.value];
  // editor.insertContent('<b>插入内容</b>');
  if (type === 'field' || type === 'operator') {
    editor.insertContent(
      `<span class="mention-${type}" contenteditable="${type !== 'field'}">${
        type === 'field' ? `#${value}#` : value
      }</span>`
    );
  } else if (offset) {
    editor.insertContent(value);
    const range = editor.selection.getRng();

    // 获取光标位置的索引
    const caretIndex = range.startOffset;
    // 计算光标位置的偏移量
    const offsetIndex = caretIndex - 1;

    console.log(caretIndex, range);
    // 设置光标位置
    editor.selection.setRng({
      startContainer: range.startContainer,
      startOffset: offsetIndex,
      endContainer: range.startContainer,
      endOffset: offsetIndex,
    });
  } else {
    editor.insertContent(value);
  }
  // 获取当前选区的范围对象
  editor.focus();
};
</script>

<style lang="scss" scoped>
.editor-content {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  border: solid 1px #dfdfdf;
  .ec-left {
    border-right: solid 1px #dfdfdf;
  }
  .ec-left,
  .ec-right {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    .title {
      padding: 5px 10px;
      border-bottom: solid 1px #dfdfdf;
    }
    .content {
      width: 100%;
      height: 300px;
      overflow: auto;
      padding: 5px 10px;
      box-sizing: border-box;
    }
  }
}
// ::v-deep(.mention-field) {
//   color: var(--el-color-primary);
// }
::v-deep(.tinymce-container) {
  .mention-field {
    color: var(--el-color-primary);
  }
}
</style>
<style></style>
