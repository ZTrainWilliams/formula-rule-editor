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
  border: none;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 70px 0 0 0;
  
  .el-menu-item {
    color: #ecf0f1;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(52, 152, 219, 0.2);
      color: #3498db;
    }
    
    &.is-active {
      background-color: #3498db;
      color: #ffffff;
    }
  }
}
</style>
