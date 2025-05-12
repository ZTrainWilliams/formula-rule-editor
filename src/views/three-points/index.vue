<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2025-04-27 10:59:42
 * @Description: 
-->
<template>
  <div class="gmesh-3d-display-container">
    <JCYVtuLoad />
    <!-- <VTUViewer /> -->
  </div>
</template>

<script>
import JCYVtuLoad from './three-points.vue';
import VTUViewer from './components/VTUViewer.vue';

export default {
  name: '',
  components: {
    JCYVtuLoad,
    VTUViewer,
  },
  props: {
    modelData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeUnmount() {},
  methods: {},
};
</script>

<style lang="scss">
.gmesh-3d-display-container {
  width: 100%;
  height: 100%;
  // background-color: #bbbbbb;
}
.gmesh-3d-display-container canvas {
  will-change: transform;
}
</style>
