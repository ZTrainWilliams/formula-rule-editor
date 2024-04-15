<!--
 * @Description: 公式规则-编辑弹窗
-->

<template>
  <el-dialog v-model="dialogVisibility" :title="title" width="780" :close-on-click-modal="false" @close="handleClose">
    <el-row class="rule-main">
      <el-col :span="16" class="main-left">
        <el-form ref="formRef" class="rule-row" :model="formValues">
          <h6>{{ curRow.name }} =</h6>
          <el-form-item
            label=" "
            prop="calcExpression"
            :label-width="0"
            :rules="[
              {
                required: true,
                message: '请输入公式规则',
              },
            ]"
          >
            <TinymceFormula
              ref="contendEditRef"
              v-model="formValues.expressionContent"
              :operatorList="operatorList"
              :functionList="functionList"
              @change="contendEditChange"
            />
          </el-form-item>

          <el-row>
            <el-button :loading="checkLoading" :disabled="regex.test(formValues.calcExpression)" @click="handleCheck">
              校验公式
            </el-button>
            <span :class="checkedClass" class="check-tip-span">
              {{ checkedTip }}
            </span>
          </el-row>
        </el-form>
        <el-divider></el-divider>
        <el-row class="rule-row">
          <h6>引用字段</h6>
          <template v-for="(item, index) in list">
            <div v-if="!variableType || variableType.includes(item.type)" :key="index">
              <p>{{ item.type }}</p>
              <div>
                <el-button
                  v-for="(m, idx) in item.variableList"
                  :key="idx"
                  :disabled="m.code === curRow.code"
                  class="tag-span"
                  @click="fieldClick(m)"
                >
                  {{ m.name }}
                </el-button>
              </div>
            </div>
          </template>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="rule-row">
          <h6>运算符</h6>
          <div class="rule-row-content">
            <el-button v-for="(m, i) in operatorList" :key="i" class="tag-span" @click="operatorClick(m)">
              {{ m.value ?? m }}
            </el-button>
          </div>
        </el-row>
        <el-row class="rule-row">
          <h6>常用函数</h6>
          <el-button v-for="(m, i) in functionList" :key="i" class="tag-span" @click="functionClick(m)">
            {{ m?.label }}
          </el-button>
        </el-row>
      </el-col>
    </el-row>

    <template #footer>
      <el-row class="dialog-footer" justify="end">
        <div>
          <el-button type="primary" :loading="loading" @click="handleConfirm"> 确定 </el-button>
          <el-button @click="handleClose">取消</el-button>
        </div>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, computed, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import TinymceFormula from './tinymce-formula.vue';

const prop = defineProps({
  request: Object,
  title: {
    type: String,
    title: '编辑公式规则',
  },
});
const emit = defineEmits(['onClose']);

const loading = ref(false);
const dialogVisibility = ref(false);
const formValues = ref({ calcExpression: null, expressionContent: '', formulaContent: '' });
const formRef = ref();
const variableType = ref(null);
const isChecked = ref(-1); // 公式检查状态 -1 未检查， 0 检查失败， 1 检查通过
const checkLoading = ref(false);
const isCheckedMessage = ref('');
const curRow = ref({ name: '' });
const contendEditRef = ref(null);
const regex = /^\s*$/;
const list = ref([]);

// 运算符列表
const operatorList = computed(() => {
  return prop.request?.operatorList ?? ['+', '-', '*', '/', '(', ')'];
});
// 函数列表
const functionList = computed(() => {
  return prop.request?.functionList ?? [];
});

// 字段数组
const selectDataList = computed(() => {
  const options = [];
  list.value.forEach((o) => {
    o.variableList.forEach((v) => {
      options.push(v);
    });
  });
  return options;
});

// 校验状态提示语
const checkedTip = computed(() => {
  if (isCheckedMessage.value) {
    return isCheckedMessage.value;
  }
  let text = '公式未检验';
  if (isChecked.value === 0) {
    text = '公式检验不通过';
  } else if (isChecked.value === 1) {
    text = '公式检验通过';
  }
  return text;
});

// 校验状态-class
const checkedClass = computed(() => {
  let text = 'info-color no-check';
  if (isChecked.value === 0) {
    text = 'error-color fail-check';
  } else if (isChecked.value === 1) {
    text = 'success-color success-check';
  }
  return text;
});

/**
 * @description: 字段-点击插入
 * @param {Object} row
 * @return {*}
 */
const fieldClick = (row) => {
  if (row.code === curRow.value.code) return;
  contendEditRef.value.insertContent({ value: row.name, type: 'field' });
};

/**
 * @description: 操作符-点击插入
 * @param {String | Object} m
 * @return {*}
 */
const operatorClick = (m) => {
  if (typeof m === 'string') {
    contendEditRef.value.insertContent({ value: m, type: 'text' });
  } else {
    contendEditRef.value.insertContent({ ...m, type: 'text' });
  }
};

/**
 * @description: 函数-点击插入
 * @param {Object} m
 * @return {*}
 */
const functionClick = (m) => {
  contendEditRef.value.insertContent({ ...m, type: 'function' });
};

/**
 * @description: 公式编辑器回调
 * @param {Arrary} l 公式类型数组
 * @return {*}
 */
const contendEditChange = (l) => {
  let expressionContent = '';
  let calcExpression = '';
  const calcList = [];
  console.log('contendEditChange', l);
  (l || []).forEach((o) => {
    if (o.type === 'field') {
      const text = o.value.replace(/#/g, '');
      const row = selectDataList.value.find((v) => v.name === text);
      if (row) {
        calcExpression += row.code;
      } else {
        calcExpression += o.value;
      }
      calcList.push({
        ...o,
        value: row ? row.code : o.value,
      });
    } else {
      calcExpression += o.value;
      calcList.push(o);
    }
    expressionContent += o.value;
  });
  formValues.value = {
    expressionContent,
    calcExpression: calcExpression.replace(/[\u200B-\u200D\uFEFF\s]/g, ''), // 替换不可见字符、及空格; /[\u200B-\u200D\uFEFF]/g 匹配了常见的不可见字符范围，包括左至右标记、零宽度空格和特殊的字节顺序标记
    calcList,
  };

  nextTick(() => {
    isChecked.value = -1;
    isCheckedMessage.value = '';
    formRef.value.validateField('calcExpression');
  });
};

/**
 * @description: 检验公式
 * @return {*}
 */
const handleCheck = () => {
  checkLoading.value = true;
  isCheckedMessage.value = '';
  return new Promise((resolve, reject) => {
    if (regex.test(formValues.value.calcExpression)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入公式规则');
      checkLoading.value = false;

      return;
    }
    formRef.value.validate((valid) => {
      if (valid) {
        prop.request
          .checkRule({
            ...(prop.request.extraParams ?? {}),
            calcExpression: formValues.value.calcExpression,
            calcList: formValues.value.calcList,
            code: curRow.value.code,
            name: curRow.value.name,
            expressionContent: formValues.value.expressionContent,
          })
          .then((res) => {
            if (res?.success) {
              resolve();
              isChecked.value = 1;
            } else {
              isChecked.value = 0;
              isCheckedMessage.value = res.message;
              reject(checkedTip.value);
            }
            checkLoading.value = false;
          })
          .catch((err) => {
            console.log('err', err);
            isChecked.value = 0;
            checkLoading.value = false;
            reject(checkedTip.value);
          });
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('请输入公式规则');
        checkLoading.value = false;
      }
    });
  });
};

/**
 * @description: 关闭弹窗
 * @return {*}
 */
const handleClose = () => {
  formValues.value = {};
  dialogVisibility.value = false;
};

/**
 * @description: 点击确定
 * @return {*}
 */
const handleConfirm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      nextTick(() => {
        handleCheck()
          .then(() => {
            emit('change', { ...formValues.value });
            handleClose();
          })
          .catch((errText) => {
            console.log('errText', errText);
            ElMessage.error(errText);
          });
      });
    }
  });
};

/**
 * @description: 打开公式编辑弹窗
 * @return {*}
 */
const open = async (data) => {
  curRow.value = data;
  await prop.request.queryVariable(curRow.value).then((res) => {
    list.value = res;
  });

  dialogVisibility.value = true;
  formValues.value = {
    expressionContent: data.expressionContent,
    calcExpression: data.calcExpression,
    calcList: data.calcList,
  };
  variableType.value = data.variableType; // 获取是否判断受限展示字段
  nextTick(() => {
    isChecked.value = -1;
    isCheckedMessage.value = '';
    formRef.value.clearValidate();
    const newCalcList = [];
    if (data.calcList) {
      data.calcList.forEach((o) => {
        if (o.type === 'field') {
          const row = selectDataList.value.find((v) => v.code === o.value);
          if (row) {
            newCalcList.push({
              type: o.type,
              value: row.value,
            });
          } else {
            newCalcList.push(o);
          }
        } else {
          newCalcList.push(o);
        }
      });
    }

    contendEditRef.value && contendEditRef.value.setContent(data.expressionContent);
  });
};

defineExpose({
  open,
});
</script>
<style lang="scss" scoped>
.rule-main {
  h6 {
    font-size: 14px;
    line-height: 14px;
    display: block;
    margin: 0 0 12px 0;
  }
  .main-left {
    border-right: 1px solid #ccc;
    .rule-row {
      max-height: 400px;
      overflow-y: auto;
      flex-wrap: nowrap;
      p {
        margin: 16px 0;
      }
    }
  }
  .check-tip-span {
    line-height: 34px;
    text-indent: 1em;
  }

  .error-color {
    color: var(--el-color-error);
  }
  .success-color {
    color: var(--el-color-success);
  }
 
  ::v-deep(.el-form-item__label) {
    display: none;
  }
  .rule-row {
    display: flex;
    flex-direction: column;
    padding: 12px;
    .rule-row-content {
      padding: 12px 0;
    }
  }
  .tag-span {
    margin: 6px 6px 0 0;
    cursor: pointer;
  }
}
</style>
