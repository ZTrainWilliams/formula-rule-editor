<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2025-03-04 14:14:17
 * @Description: 
-->
<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical" @select="handleSelect">
    <!-- <div class="logo">XX管理系统</div> -->
    <el-menu-item index="/">
      <template #title><i class="el-icon-s-home"></i>rule-editor</template>
    </el-menu-item>
    <el-menu-item index="/select-tree">
      <template #title><i class="el-icon-s-help"></i>select-tree</template>
    </el-menu-item>
    <el-menu-item index="/canvas-animation">
      <template #title><i class="el-icon-s-help"></i>canvas-animation</template>
    </el-menu-item>
    <el-menu-item index="/hm-time-picker">
      <template #title><i class="el-icon-s-help"></i>hm-time-picker</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Sidebar',
  components: {},
  data() {
    return {
      router: true,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
  },
});
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none; /* 去除边框 */
  background-color: #304156; /* 侧边栏菜单背景色 */
  color: white;
  padding: 60px 0 0 0;
  .el-menu-item {
    color: white;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1); /* 鼠标悬停背景色 */
    }
    &.is-active {
      background-color: #409eff; /* 激活项背景色 */
    }
  }
}
</style>
