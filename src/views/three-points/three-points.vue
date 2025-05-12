<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2025-04-27 10:59:42
 * @Description: 
-->
<template>
  <div class="container-" ref="canvasContainer">
  </div>
</template>

<script>
import ThreeScene from './MechanismThreeScene';
import { markRaw } from 'vue';

export default {
  components: {  },
  data() {
    return {
      threeScene: null
    };
  },

  mounted() {
    // 初始化 Three.js 场景
    this.threeScene = markRaw(new ThreeScene(this.$refs.canvasContainer));
  },

  beforeDestroy() {
    // 清理 Three.js 场景
    if (this.threeScene) {
      this.threeScene.dispose();
    }
  }
};
</script>

<style>
.container- {
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 00px;
  overflow: hidden;
  position: relative;
}
</style>
