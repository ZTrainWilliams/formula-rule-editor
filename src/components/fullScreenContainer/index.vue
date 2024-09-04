<!--
 * @Author: 车南 chenan_yushun@163.com
 * @Date: 2023-02-15 11:48:46
 * @Description: 大屏缩放容器
-->
<template>
  <div id="dv-full-screen-container" :ref="ref" style="display: flex; justify-content: center; align-items: center">
    <div ref="childRef" :style="`width: ${initWidth}px; height: ${initHeight}px`">
      <template v-if="ready">
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import autoResize from './util/autoResize.js';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'DvFullScreenContainer',
  mixins: [autoResize],
  props: {
    // 是否使用父级宽度,传入类名，获取dom宽度后作为缩放比较
    isUseScaleByDom: {
      type: String,
      default: '',
    },
    initWidth: {
      type: Number,
      default: 1920,
    },
    initHeight: {
      type: Number,
      default: 1080,
    },
  },
  data() {
    return {
      ref: 'full-screen-container',
      allWidth: 0,
      scale: 0,
      datavRoot: '',
      ready: false,
    };
  },
  computed: {
    ...mapGetters(['screenIsFull']),
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this;

      initConfig();

      setAppScale();

      this.ready = true;
    },
    initConfig() {
      const { dom } = this;
      this.allWidth = this.initWidth;
      dom.style.width = `${this.initWidth}px`;
      dom.style.height = `${this.initHeight}px`;
    },
    setAppScale() {
      const { allWidth, dom } = this;
      let currentWidth = document.body.clientWidth;
      if (this.screenIsFull) {
        if (this.$refs.childRef) {
          this.$refs.childRef.style.transform = `scale(${currentWidth / allWidth})`;
        }
      } else {
        if (this.$refs.childRef) {
          this.$refs.childRef.style.transform = '';
        }
        if (this.isUseScaleByDom) {
          currentWidth = document.querySelector(this.isUseScaleByDom).clientWidth;
        }
        if (dom) {
          dom.style.transform = `scale(${currentWidth / allWidth})`;
        }
      }
    },
    onResize() {
      const { setAppScale } = this;
      setAppScale();
    },
  },
});
</script>
<style>
#dv-full-screen-container {
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
