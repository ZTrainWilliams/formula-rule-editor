<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-02-04 10:20:25
 * @Description: 
-->
<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="treeV2" name="treeV2">
      <div>
        <p>内容介绍：这是一个支持多选、单选的树组件，使用 check-strictly 可以取消父子节点的关联选择。</p>
        <el-row type="flex">
          <span>结果展示：</span>
          {{ treeValue }}
        </el-row>
        <div>
          <treeV2
            v-model="treeValue"
            :data="treeData"
            :check-strictly="true"
            :showCheckbox="true"
            style="min-width: 200px"
          ></treeV2>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="selectTreeV2" name="SelectTreeV2">
      <div>
        <p>内容介绍：这是一个支持多选、单选的树形下拉组件。</p>
        <el-row type="flex">
          <span>结果展示：</span>
          {{ selectTreeValue }}
        </el-row>
        <div>
          <SelectTreeV2 v-model="selectTreeValue" :data="treeData" :props="treeProps"></SelectTreeV2>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="TreeSelectInclude" name="TreeSelectInclude">
      <div>
        <p>内容介绍：这是一个支持选择是否包含子集的树组件，通过 isInclude 参数可以控制后端筛选状态。</p>
        <el-row type="flex">
          <span>结果展示：</span>
          {{ treeSelectIncludeValue }}
        </el-row>
        <div>
          <TreeSelectInclude
            v-model="treeSelectIncludeValue.treeSelectValue"
            :data="treeData"
            v-model:isInclude="treeSelectIncludeValue.isInclude"
          ></TreeSelectInclude>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, reactive } from 'vue';
import treeV2 from '@/components/treeV2/index.vue';
import SelectTreeV2 from '@/components/select-treeV2/index.vue';
import TreeSelectInclude from '@/components/tree-select-include-subsets/index.vue';

// 默认展开所有 collapse
const activeName = ref(['treeV2', 'SelectTreeV2', 'TreeSelectInclude']);
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

<style scoped>
p{
  padding: 8px 0;
}
</style>