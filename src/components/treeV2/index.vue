<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-02-4 20:27:02
 * @Description: 虚拟tree
-->
<template>
  <el-tree-v2
    ref="treeV2Ref"
    v-loading="loading"
    :data="treeData"
    :props="props.props"
    :check-strictly="props.checkStrictly"
    :showCheckbox="props.showCheckbox"
    @check-change="treeChange"
  >
    <template #default="{ node, data }">
      <span class="prefix" :class="{ 'is-leaf': node.isLeaf }">
        <el-button
          v-if="data.children && data.children.length"
          link
          type="primary"
          @click.stop="nodeClick(node, data)"
          :disabled="node.disabled"
        >
          <slot name="select-all-title">
            [全选]
          </slot>
        </el-button>
        {{ node.label }}
      </span>
    </template>
  </el-tree-v2>
</template>

<script setup>
import { defineProps, watch, ref, defineEmits, nextTick, onMounted } from 'vue';
import { uniq, without } from 'lodash-es';
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
    type: Array,
    default: () => [],
  },
  data: {
    // tree-data
    type: Array,
    default: () => [],
  },
  url: {
    // treedata请求接口
    type: String,
    default: '',
  },
  query: {
    // 请求传参
    type: Object,
    default: () => {},
  },
  formatter: {
    // 请求内容格式化
    type: Function,
    default: (res) => res?.data ?? [],
  },
  props: {
    // 配置选项
    type: Object,
    default: () => ({
      label: 'title',
      value: 'id',
      children: 'children',
      disabled: 'disabled',
    }),
  },
  checkStrictly: {
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    type: Boolean,
    default: true,
  },
  showCheckbox: {
    // 节点是否可被选择
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update', 'change', 'treeChange']);

const loading = ref(false);
const treeData = ref(props.data);
const selectData = ref([]);
const treeV2Ref = ref(null);

/**
 * @description: 获取tree数据
 * @return {*}
 */
const loadTreeData = () => {
  if (props.url && loading.value === false) {
    loading.value = true;
    fetchUrlData(props.url, props.query)
      .then((res) => {
        if (res) {
          treeData.value = props.formatter(res);
          setCheckedKeys(selectData.value);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

/**
 * @description: tree选择回调
 * @param {Array} row
 * @param {Boolean} checked
 * @return {*}
 */
const treeChange = (row, checked) => {
  emit('treeChange', row, checked);
  update(treeV2Ref.value?.getCheckedKeys());
};

/**
 * @description: 更新
 * @param {Array} list
 * @return {*}
 */
const update = (list) => {
  selectData.value = list;
  emit('update:modelValue', selectData.value);
  emit('change', selectData.value);
};

// 获取全部子节点
/**
 * @description: 
 * @param {Array} list
 * @param {Array} result
 * @return {Array}
 */
const getDeepChildren = (list, result = []) => {
  list.forEach((item) => {
    if (item.children && item.children.length > 0) {
      getDeepChildren(item.children, result);
    }
    !item.disabled && result.push(item.key);
  });
  return result;
};

/**
 * @description: 判断存在未勾选
 * @param {Array} checkedKeys
 * @param {Array} childrens
 * @return {Boolean}
 */
const isCheckAllChildren = (checkedKeys, childrens) => {
  const setCheckedKeys = new Set();
  checkedKeys.forEach((v) => setCheckedKeys.add(v));
  for (let i = 0; i < childrens.length; i += 1) {
    if (!setCheckedKeys.has(childrens[i])) {
      return false;
    }
  }
  return true;
};

/**
 * @description: 全选点击
 * @param {*} node
 * @return {*}
 */
const nodeClick = (node) => {
  if (node.disabled) return false;
  const checkedKeys = treeV2Ref.value?.getCheckedKeys();
  const childrens = [...getDeepChildren(node.children ?? []), node.key]; // 全选-包含本级
  nextTick(() => {
    let list = [];
    if (isCheckAllChildren(checkedKeys, childrens)) {
      // 反选
      list = without(checkedKeys, ...childrens);
      treeV2Ref.value.setCheckedKeys();
    } else {
      list = uniq([...checkedKeys, ...childrens]);
    }
    treeV2Ref.value.setCheckedKeys(list);
    update(list);
  });
};

const setCheckedKeys = (list) => {
  if (list && Array.isArray(list)) {
    nextTick(() => {
      treeV2Ref.value.setCheckedKeys([...list]);
    });
  }
};

onMounted(() => {
  loadTreeData();
});

watch(
  () => props.data,
  (val) => {
    if (!props.url) {
      if (val) {
        treeData.value = Array.isArray(val) ? val : [];
      }
    }
  }
);

watch(
  () => props.modelValue,
  (val) => {
    if (val && Array.isArray(val)) {
      selectData.value = val;
      setCheckedKeys(val);
    }
  },
  {
    immediate: true,
  }
);

defineExpose({
  setCheckedKeys,
});
</script>
