// ThreeScene.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ComsolPointsMaterial } from './material/ComsolPointsMaterial'

export default class ThreeScene {
  constructor(container, options = {}) {
    this.container = container
    this.options = {
      csvPath: '/public/static/output_15_52_50.csv', // 默认路径
      levelLow: 297, // 默认最低温度
      levelHigh: 301, // 默认最高温度
      sampleRate: 1, // 默认采样率
      ...options // 允许外部覆盖
    }

    // 初始化场景
    this.initScene()
    this.loadData()
    this.animate()
  }

  initScene() {
    const { clientWidth: width, clientHeight: height } = this.container

    // 1. 场景和渲染器
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ alpha: true,
      powerPreference: "high-performance" })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x000000, 0)
    this.container.appendChild(this.renderer.domElement)

    // 2. 相机调整（横屏适配）
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    this.camera.position.set(2, 2, 4) // 调整相机位置
    this.camera.lookAt(0, 2, 0)

    // 3. 控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true // 添加阻尼惯性

    // 4. 坐标轴辅助（调试用，可选）
    this.scene.add(new THREE.AxesHelper(1))
  }

  async loadData() {
    try {
      const response = await fetch(this.options.csvPath)
      const content = await response.text()
      const points = this.parseCSV(content)

      // 计算包围盒以自适应缩放
      const { positions, values, boundingBox } = this.processPoints(points)

      // 采样点
      const { sampledPositions, sampledValues } = this.samplePoints(
        positions,
        values,
        this.options.sampleRate
      )

      if (!this.points) {
        this.addPointsToScene(sampledPositions, sampledValues)
      } else {
        this.updatePoints(sampledPositions, sampledValues)
      }
      this.adjustCamera(boundingBox);
      //   this.setCameraParams({
      //     "position": {
      //         "x": 9.776093493669332,
      //         "y": -0.24589137749737427,
      //         "z": -0.05158733626325577
      //     },
      //     "lookAt": {
      //         "x": 0,
      //         "y": 0.23600006103515625,
      //         "z": 0.0000019073486328125
      //     },
      //     "zoom": 1
      // })
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  }

  parseCSV(csv) {
    const lines = csv.split(/\r?\n/).filter((ln) => !!ln)
    const headers = lines[0].split(',')
    return lines.slice(1).map((line) => {
      const obj = {}
      line.split(',').forEach((val, j) => {
        obj[headers[j]] = parseFloat(val)
      })
      return obj
    })
  }

  processPoints(points) {
    const positions = []
    const values = []
    const boundingBox = new THREE.Box3()
    // console.log(points)
    points.forEach((point) => {
      // 调整坐标系：Z轴向上变为Y轴向上（横屏）
      positions.push(point.x, point.z, -point.y) // 交换Y/Z并反转Y
      values.push(point.T)
      boundingBox.expandByPoint(new THREE.Vector3(point.x, point.z, -point.y))
    })

    return { positions, values, boundingBox }
  }

  adjustCamera(boundingBox) {
    const size = boundingBox.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, -size.z)
    const center = boundingBox.getCenter(new THREE.Vector3())
    // 调整相机视野
    this.camera.position.copy(center).add(new THREE.Vector3(0, 0, maxDim * 2))
    this.camera.lookAt(center)
    this.controls.target.copy(center)
    this.controls.update()
  }

  // 获取当前视角参数
  getCameraParams() {
    return {
      position: this.camera.position.clone(),
      lookAt: this.controls.target.clone(),
      zoom: this.camera.zoom
    }
  }

  // 设置视角参数
  setCameraParams(params) {
    if (params.position) this.camera.position.copy(params.position)
    if (params.lookAt) this.controls.target.copy(params.lookAt)
    if (params.zoom) this.camera.zoom = params.zoom
    this.camera.updateProjectionMatrix()
    this.controls.update()
  }

  samplePoints(positions, values, sampleRate) {
    const sampledPositions = []
    const sampledValues = []
    for (let i = 0; i < positions.length; i += 3) {
      if (Math.random() < sampleRate) {
        sampledPositions.push(positions[i], positions[i + 1], positions[i + 2])
        sampledValues.push(values[i / 3])
      }
    }
    return { sampledPositions, sampledValues }
  }

  addPointsToScene(positions, values) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('val0', new THREE.Float32BufferAttribute(values, 1))

    const material = new ComsolPointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      color: null,
      transparent: true, // 新增
      // levelLow: this.options.levelLow,
      // levelHigh: this.options.levelHigh
    })

    // 设置温度范围
    material.levelLow = this.options.levelLow
    material.levelHigh = this.options.levelHigh

    this.points = new THREE.Points(geometry, material)
    this.scene.add(this.points)
  }

  updatePoints(newPositions, newValues) {
    this.points.geometry.attributes.position.array = new Float32Array(newPositions)
    this.points.geometry.attributes.val0.array = new Float32Array(newValues)
    this.points.geometry.attributes.position.needsUpdate = true
    this.points.geometry.attributes.val0.needsUpdate = true
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.dispose()
  }
}
