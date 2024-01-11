import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { store } from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/components/Tinymce/index.js';
// 创建vue实例
const app = createApp(App);

app.use(ElementPlus);

app.use(router);
app.use(store);

// 挂载实例
app.mount('#app');
