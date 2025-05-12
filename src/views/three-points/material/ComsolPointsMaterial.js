import { PointsMaterial } from "three";
import { h4 } from "./CommonShader";
// PointsMaterial three v0.149.0 有效
export class ComsolPointsMaterial extends PointsMaterial {

	constructor(params) {
		super(params)

		this.u_low_ = {
			value: 0
		}
		this.u_high_ = {
			value: 1
		}

	}

	get levelLow() {
		return this.u_low_.value
	}

	set levelLow(v) {
		this.u_low_.value = v
	}

	get levelHigh() {
		return this.u_high_.value
	}

	set levelHigh(v) {
		this.u_high_.value = v
	}

	onBeforeCompile(shader, renderer) {

		// console.log(shader.vertexShader)

		shader.uniforms.u_low = this.u_low_
		shader.uniforms.u_high = this.u_high_

		shader.vertexShader = shader.vertexShader.replace('void main() {', `
		attribute float val0;
		varying float vVal0;
		void main() {
			vVal0 = val0;
		`)

		// console.log(shader.fragmentShader)

		shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `
		varying float vVal0;
		#include <common>

		uniform float u_low;
		uniform float u_high;

		${h4}
		`)

		// https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/output_fragment.glsl.js
		shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', `
		
		float v = (vVal0 - u_low) / (u_high - u_low);
		vec3 col = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), v); // 手动红蓝渐变
		h4_initia();
		outgoingLight = h4_color(v);
		
		#include <output_fragment>
		`)

	}

}

