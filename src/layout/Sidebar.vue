<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical" @select="handleSelect">
    <!-- <div class="logo">XX管理系统</div> -->
    <el-menu-item index="/">
      <template #title><i class="el-icon-s-home"></i>rule-editor</template>
    </el-menu-item>
    <el-menu-item index="/select-tree">
      <template #title><i class="el-icon-s-help"></i>select-tree</template>
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
  background: #d3dce6;
  border-right: 0;
}
</style>
