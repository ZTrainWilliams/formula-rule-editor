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
.logo {
  padding-left: 25px;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
  font-size: 18px;
}
.el-menu {
  height: 100%;
  border-color: #d3dce6;
}
</style>
