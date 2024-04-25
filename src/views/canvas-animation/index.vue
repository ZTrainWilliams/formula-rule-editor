<template>
  <el-select v-model="selectValue" @change="slectChange" style="margin-bottom: 12px">
    <el-option value="setNebulaCanvas" label="星云">星云</el-option>
    <el-option value="setStarryCanvas" label="星空">星空</el-option>
  </el-select>
  <canvas id="canvasBox" class="canvas" ref="canvas"></canvas>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { setNebulaCanvas, setStarryCanvas } from '@/canvas/utils.js';

const selectValue = ref('setNebulaCanvas');

const slectChange = (value) => {
  switch (value) {
    case 'setNebulaCanvas':
      setNebulaCanvas();
      break;
    case 'setStarryCanvas':
      setStarryCanvas();
      break;
  }
};

onMounted(() => {
  setNebulaCanvas();
});
</script>
<style>
.canvas {
  width: 100%;
  height: 98%;
  background-color: #000;
}
</style>
