<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2025-04-28 16:52:14
 * @Description: 
-->
<template>
  <div ref="container" class="vtu-viewer"></div>
</template>

<script>
import * as THREE from 'three';
import { VTULoader } from './VTULoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { markRaw } from 'vue';

export default {
  name: 'VTUViewer',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      mesh: null,
    };
  },
  mounted() {
    this.initThreeJS();
    this.loadVTUFile('/public/static/transformer.vtu');
  },
  beforeDestroy() {
    this.cleanup();
  },
  methods: {
    initThreeJS() {
      // 1. 创建场景
      this.scene = markRaw(new THREE.Scene());
      this.scene.background = markRaw(new THREE.Color(0xf0f0f0));

      // 2. 创建相机
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera = markRaw(new THREE.PerspectiveCamera(75, width / height, 0.1, 1000));
      this.camera.position.z = 5;

      // 3. 创建渲染器
      this.renderer = markRaw(new THREE.WebGLRenderer({ antialias: true }));
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(this.renderer.domElement);

      // 4. 添加轨道控制器
      this.controls = markRaw(new OrbitControls(this.camera, this.renderer.domElement));
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;

      // 5. 添加光源
      const ambientLight = new THREE.AmbientLight(0x404040);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      this.scene.add(directionalLight);

      // 6. 开始动画循环
      this.animate();

      // 7. 处理窗口大小变化
      window.addEventListener('resize', this.onWindowResize);
    },

    loadVTUFile(url) {
      // const loader = new VTKLoader();
      const loader = new VTULoader();

      loader.load(
        url,
        (geometry) => {
          // 加载成功回调
          console.log('VTU文件加载成功', geometry);
          // geometry.center()
          // geometry.computeVertexNormals();
          // 创建材质
          const material = new THREE.MeshStandardMaterial({
            color: 0x4a8eff,
            wireframe: false,
            side: THREE.DoubleSide,
            flatShading: true,
          });

          // 创建网格
          this.mesh = markRaw(new THREE.Mesh(geometry, material));

          // 计算居中位置
          geometry.computeBoundingBox();
          const boundingBox = geometry.boundingBox;
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);

          this.mesh.position.x = -center.x;
          this.mesh.position.y = -center.y;
          this.mesh.position.z = -center.z;

          // 添加到场景
          this.scene.add(this.mesh);

          // 自动调整相机位置
          const size = boundingBox.getSize(new THREE.Vector3()).length();
          this.camera.position.z = size * 1.5;
          this.controls.update();
        },
        (progress) => {
          // 加载进度回调
          // console.log(`加载进度: ${((progress.loaded / progress.total) * 100).toFixed(2)}%`);
        },
        (error) => {
          // 加载错误回调
          console.error('加载VTU文件出错:', error);
          this.$emit('error', error);
        }
      );
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },

    onWindowResize() {
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },

    cleanup() {
      window.removeEventListener('resize', this.onWindowResize);

      if (this.renderer) {
        this.renderer.dispose();
        this.renderer.forceContextLoss();
        this.renderer.domElement = null;
        this.renderer = null;
      }

      if (this.$refs.container && this.renderer?.domElement) {
        this.$refs.container.removeChild(this.renderer.domElement);
      }
    },
  },
};
</script>

<style scoped>
.vtu-viewer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
