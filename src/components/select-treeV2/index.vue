<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-02-04 10:13:31
 * @Description: select-treeV2
-->
<template>
  <el-select
    v-model="selectValue"
    :data="deptData"
    multiple
    :collapse-tags="collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    :clearable="clearable"
    :disabled="disabled"
    :size="size"
    style="width: 100%"
    @remove-tag="removeSelectTag"
    @clear="clearSelect"
  >
    <el-option
      v-for="item in options"
      :key="item[props.value]"
      :label="item[props.label]"
      :value="item[props.value]"
      v-show="false"
    />
    <el-option disabled style="height: auto; background: #fff">
      <treeV2
        v-model="selectValue"
        ref="treeV2Ref"
        :data="deptData"
        :props="props.props"
        :check-strictly="checkStrictly"
        :showCheckbox="showCheckbox"
        style="min-width: 220px"
        @change="update"
      >
      </treeV2>
    </el-option>
  </el-select>
</template>

<script setup>
import { defineProps, watch, ref, defineEmits, computed, onMounted, nextTick } from 'vue';
import treeV2 from '../treeV2/index.vue';
import axios from 'axios';

const fetchUrlData = (url, params) => {
  return axios({
    url,
    method: 'get',
    params,
  });
};

/**
 * 树状结构转数组格式
 * @author zhangling
 * @param {Array} array
 * @param {String} children
 * @return {Array}
 */
const treeToArray = (array, children = 'children') => {
  const dataList = [];
  const generateList = (data) => {
    (data || []).forEach((node) => {
      const payload = {
        ...node,
      };
      delete payload[children];
      dataList.push(payload);
      if (node[children]) {
        generateList(node[children]);
      }
    });
  };
  generateList(array);
  return dataList;
};

const props = defineProps({
  modelValue: {
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
  formatterSelect: {
    // 请求内容格式化
    type: Function,
    default: (res) => {
      return res?.data ?? [];
    },
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
  collapseTags: {
    // 选项是否收缩
    type: Boolean,
    default: true,
  },
  collapseTagsTooltip: {
    // 选项收缩是否显示提示
    type: Boolean,
    default: true,
  },
  clearable: {
    // 选项是否可以清空
    type: Boolean,
    default: true,
  },
  disabled: {
    // 是否禁用
    type: Boolean,
    default: false,
  },
  size: {
    // 	输入框尺寸
    type: String,
    default: 'default',
  },
  height: {
    // 默认高度
    type: Number,
    default: 320,
  },
});

const emit = defineEmits(['update', 'change']);

const deptData = ref(props.data);
const selectValue = ref([]);
const loading = ref(false);
const options = computed(() => treeToArray(deptData.value));
const treeV2Ref = ref();

/**
 * @description: 获取options数据
 * @return {*}
 */
const loadSelectData = () => {
  if (props.url && loading.value === false) {
    loading.value = true;
    fetchUrlData(props.url, props.query)
      .then((res) => {
        if (res) {
          deptData.value = props.formatterSelect(res.data);
          setCheckedKeys(selectValue.value);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

/**
 * @description: 移除tag
 * @param {String} value
 * @return {*}
 */
const removeSelectTag = (value) => {
  const index = selectValue.value.indexOf(value);
  if (index !== -1) selectValue.value.splice(index, 1);
  emit('update:modelValue', selectValue.value);
  emit('change', selectValue.value);
};

/**
 * @description: 清空选择
 * @return {*}
 */
const clearSelect = () => {
  selectValue.value = [];
  emit('update:modelValue', selectValue.value);
  emit('change', selectValue.value);
};

/**
 * @description: 更新
 * @param {Array} list
 * @return {*}
 */
const update = (list) => {
  selectValue.value = list;
  emit('update:modelValue', selectValue.value);
  emit('change', selectValue.value);
};

/**
 * @description: 选中勾选项
 * @param {Array} list
 * @return {*}
 */
const setCheckedKeys = (list) => {
  nextTick(() => {
    treeV2Ref.value.setCheckedKeys(selectValue.value);
  });
};

onMounted(() => {
  loadSelectData();
});

watch(
  () => props.data,
  (val) => {
    if (val && Array.isArray(val)) {
      deptData.value = val;
    }
  }
);

watch(
  () => props.modelValue,
  (val) => {
    if (val && Array.isArray(val)) {
      selectValue.value = val;
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
