<template>
  <div class="index-page">
    <h3>欢迎使用业务规则公式编辑器</h3>
    <div>
      <p style="margin: 16px 0">公式规则:</p>
      <div class="content">
        {{ formValue.expressionContent }}
        <el-button type="" link title="编辑" @click="handleClick">
          <el-icon>
            <Edit />
          </el-icon>
        </el-button>
      </div>
      <p style="margin: 16px 0">实际公式规则:</p>
      <div class="content">
        {{ formValue.calcExpression }}
      </div>
      <el-button type="primary" @click="handleClick">编辑规则</el-button>
    </div>
    <el-row> </el-row>
    <FormulaRules
      ref="formulaRulesRef"
      :title="'编辑公式规则'"
      :request="{ queryVariable, checkRule, functionList: functionList }"
      @change="closeFormulaRules"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import FormulaRules from '@/components/formula-rules/formula-dialog.vue';
import { Edit } from '@element-plus/icons-vue';
import { Parser } from 'expr-eval/dist/bundle.min.js';

// 引用字段
const ruleFieldList = ref([
  {
    type: '营业体系',
    variableList: [
      {
        code: 'MAIN_BUSINESS_INCOME',
        name: '主营业务收入',
      },
      {
        code: 'MATERIAL_SALES_INCOME',
        name: '材料销售收入',
      },
      {
        code: 'OTHER_BUSINESS_INCOME',
        name: '其他业务收入',
      },
      {
        code: 'MAIN_BUSINESS_COST',
        name: '主营业务成本',
      },
      {
        code: 'BUSINESS_TAX_SURCHARGE',
        name: '营业税金及附加',
      },
      {
        code: 'OPERATING_EXPENSES',
        name: '营业费用',
      },
    ],
  },
  {
    type: '资产运营',
    variableList: [
      {
        code: 'SELLING_EXPENSES',
        name: '销售费用',
      },
      {
        code: 'FINANCIAL_EXPENSES',
        name: '财务费用',
      },
      {
        code: 'INVESTMENT_INCOME',
        name: '投资收益',
      },
      {
        code: 'ASSET_IMPAIRMENT_LOSS',
        name: '资产减值损失',
      },
    ],
  },
  {
    type: '其他',
    variableList: [
      {
        code: 'OTHER_BUSINESS_COST',
        name: '其他业务成本',
      },
    ],
  },
  {
    type: '系数',
    variableList: [
      {
        code: 'PERFORMANCE_COEFFICIENT',
        name: '绩效系数',
      },
      {
        code: 'ANNUAL',
        name: '年度',
      },
      {
        code: 'QUARTERLY',
        name: '季度',
      },
      {
        code: 'MONTHLY',
        name: '月度',
      },
    ],
  },
]);
const formValue = ref({
  expressionContent: '#主营业务收入#+#材料销售收入#', // 显示公式
  calcExpression: 'MAIN_BUSINESS_INCOME+MATERIAL_SALES_INCOME', // 实际作用公式
});
const formulaRulesRef = ref(null);

const functionList = ref([
  {
    label: 'AND',
    value: 'AND',
    offsetIdx: 0,
  },
  {
    label: 'OR',
    value: 'OR',
    offsetIdx: 0,
  },
  {
    label: 'IF',
    value: ['IF(', ')'],
  },
  {
    label: 'HALT',
    value: ['HALT("', '", , )'],
  },
]);

const parser = new Parser();

// using expr-eval validate; Or through interface verification
const checkRule = (pramas) => {
  return new Promise((resolve, reject) => {
    pramas.calcList.forEach((o) => {
      if (o.type === 'field') {
        parser.consts[o.value] = 1;
      }
    });
    const result = parser.evaluate(pramas.calcExpression); // evaluate
    if (result !== null || result === undefined) {
      resolve({
        success: true,
        message: '公式校验通过',
      });
    }
    return result;
    // if (!['+', '-', '*', '/'].includes(pramas.calcList[pramas.calcList.length - 1].value)) {
    //   resolve({
    //     success: true,
    //     message: '公式校验通过',
    //   });
    // } else {
    //   resolve({
    //     success: false,
    //     message: '公式校验不通过',
    //   });
    // }
  });
};

const queryVariable = () => {
  return new Promise((resolve) => {
    resolve(ruleFieldList.value);
  });
};

const handleClick = () => {
  const values = {
    name: '营业利润',
    code: '',
  };
  formulaRulesRef.value.open({ ...values, ...formValue.value });
};

/**
 * @description: 公式编辑回调
 * @param {Object} values
 * @return {*}
 */
const closeFormulaRules = (values) => {
  if (values) {
    formValue.value.expressionContent = values.expressionContent;
    formValue.value.calcExpression = values.calcExpression;
  }
};
</script>
<style lang="scss">
.content {
  padding: 12px 10px;
  background-color: azure;
  margin-bottom: 12px;
}
</style>
