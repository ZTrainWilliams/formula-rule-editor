<!--
 * @Description: 树形子集切换（全选、单选）选择组件
-->
<template>
  <el-tree-select v-model="selectValue" :data="treeData" v-bind="{ ...selectProps }" @change="handleChange">
    <template v-if="showHeader" #header>
      <el-checkbox
        v-model="isIncludeChild"
        :true-label="1"
        :false-label="0"
        :true-value="1"
        :false-value="0"
        @change="handleChange"
      >
        是否包含子集
      </el-checkbox>
    </template>
  </el-tree-select>
</template>

<script setup>
import { watch, ref, computed, onMounted, nextTick } from 'vue';
import axios from 'axios';
const fetchUrlData = (url, params) => {
  return axios({
    url,
    method: 'get',
    params,
  });
};
const props = defineProps({
  modelValue: {
    // v-model-value
    type: [String, Array],
    default: '',
  },
  isInclude: {
    type: [Number, Boolean],
    default: 0,
  },
  props: {
    // select-tree配置选项
    type: Object,
    default: () => {},
  },
  data: {
    type: Array,
    default: () => [],
  },
  valueJoin: {
    type: String,
    default: ',',
  },
  labelJoin: {
    // 是否自动拼接数据
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  url: {
    // treedata请求接口
    type: String,
    default: '',
  },
  formatterSelect: {
    // 请求内容格式化
    type: Function,
    default: (res) => {
      return res?.data ?? [];
    },
  },
});

const emit = defineEmits(['onUpdate:modelValue', 'update:isInclude', 'change']);

const treeData = ref(props.data);
const selectValue = ref(undefined);
const isIncludeChild = ref(0);
const loading = ref(false);

const selectProps = computed(() => {
  return {
    multiple: true,
    showCheckbox: true,
    filterable: true,
    clearable: true,
    collapseTags: true,
    collapseTagsTooltip: true,
    maxCollapseTags: 1,
    checkStrictly: true,
    nodeKey: 'id',
    props: {
      label: 'title',
      value: 'value',
      children: 'children',
    },
    defaultExpandedKeys: treeData.value?.length > 0 ? [treeData.value[0].id] : [],
    // 默认参数
    ...props.props,
  };
});
const loadTreeData = () => {
  if (props.url && loading.value === false) {
    loading.value = true;
    fetchUrlData(props.url, props.query)
      .then((res) => {
        if (res) {
          treeData.value = props.formatterSelect ? props.formatterSelect(res.data) : res.data;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

const handleChange = () => {
  let result = selectValue.value;
  if (selectProps.value.multiple) {
    result = props.labelJoin && selectValue.value ? selectValue.value.join(',') : selectValue.value;
  }
  const checkVal = Number(isIncludeChild.value);
  emit('update:isInclude', checkVal);
  emit('update:modelValue', result);
  emit('change', result, checkVal);
};

onMounted(() => {
  // 获取接口数据
  nextTick(() => {
    loadTreeData();
  });
});

watch(
  () => props.isInclude,
  (val) => {
    isIncludeChild.value = val;
  },
  {
    immediate: true,
  },
);

watch(
  () => props.modelValue,
  (val) => {
    if (val === null || val === undefined || val === '') {
      selectValue.value = undefined;
    } else if (Array.isArray(val)) {
      selectValue.value = val;
    } else if (typeof val === 'string') {
      selectValue.value = val.split(',');
    } else {
      selectValue.value = val;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
