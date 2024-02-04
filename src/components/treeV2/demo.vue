<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-02-04 10:13:31
 * @Description: treeV2使用方式
-->

<template>
  <treeV2 v-model="value" v-bind="props"></treeV2>
</template>

<script>
import treeV2 from './index.vue';
export default {
  components: { treeV2 },
  data() {
    return {
      value: [],
      props: {
        url: `/api/blade-system/biz/dept/tree-new`,
        query: {
          tenantId: '000000',
        },
      },
    };
  },
};
</script>

<style scoped></style>
