/*
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-01-17 10:24:48
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') //设置别名
    }
  },
  plugins: [vue()],
  base: "./",
})
