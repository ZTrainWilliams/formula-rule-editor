<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-02-04 10:20:25
 * @Description: 
-->
<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="treeV2" name="treeV2">
      <div>
        <treeV2
          v-model="treeValue"
          :data="treeData"
          :check-strictly="true"
          :showCheckbox="true"
          style="min-width: 200px"
        ></treeV2>
      </div>
      <div>
        {{ treeValue }}
      </div>
    </el-collapse-item>
    <el-collapse-item title="selectTreeV2" name="SelectTreeV2">
      <div>
        <SelectTreeV2 v-model="selectTreeValue" :data="treeData" :props="treeProps"></SelectTreeV2>
      </div>
      <div>
        {{ selectTreeValue }}
      </div>
    </el-collapse-item>
    <el-collapse-item title="TreeSelectInclude（是否包含子集的参数isInclude，用于后端区分筛选状态，可减少数据传递）" name="TreeSelectInclude">
      <div>
        {{ treeSelectIncludeValue }}
      </div>
      <div>
        <TreeSelectInclude
          v-model="treeSelectIncludeValue.treeSelectValue"
          :data="treeData"
          v-model:isInclude="treeSelectIncludeValue.isInclude"
        ></TreeSelectInclude>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, reactive } from 'vue';
import treeV2 from '@/components/treeV2/index.vue';
import SelectTreeV2 from '@/components/select-treeV2/index.vue';
import TreeSelectInclude from '@/components/tree-select-include-subsets/index.vue';

const activeName = ref(['treeV2', 'selectTreeV2']);
const treeValue = ref([]);
const treeProps = ref({
  label: 'title',
  value: 'id',
  children: 'children',
  disabled: 'disabled',
});
const selectTreeValue = ref([]);
const treeData = ref([
  {
    id: '1',
    title: 'Level one 1',
    children: [
      {
        id: '1-1',
        title: 'Level two 1-1',
        children: [
          {
            id: '1-1-1',
            title: 'Level three 1-1-1',
          },
        ],
      },
      {
        id: '1-2',
        title: 'Level two 1-2',
        children: [
          {
            id: '1-2-1',
            title: 'Level three 1-2-1',
          },
          {
            id: '1-2-2',
            title: 'Level three 1-2-2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Level one 2',
    children: [
      {
        id: '2-1',
        title: 'Level two 2-1',
        children: [
          {
            id: '2-1-1',
            title: 'Level three 2-1-1',
          },
        ],
      },
      {
        id: '2-2',
        title: 'Level two 2-2',
        children: [
          {
            id: '2-2-1',
            title: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Level one 3',
    children: [
      {
        id: '3-1',
        title: 'Level two 3-1',
        children: [
          {
            id: '3-1-1',
            title: 'Level three 3-1-1',
          },
        ],
      },
      {
        id: '3-2',
        title: 'Level two 3-2',
        children: [
          {
            id: '3-2-1',
            title: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]);

// const treeSelectIncludeProps = ref({})
const treeSelectIncludeValue = reactive({
  treeSelectValue: '',
  isInclude: 0, // 0 不包含子集，1 包含子集
});
</script>

<style scoped></style>
