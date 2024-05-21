/**
 * 预渲染，兼 vue 主进程
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';
import '../electron/ElectronRenderer'

import 'element-plus/dist/index.css'
import './assets/font/iconfont.css';
import './assets/font/iconfont.js';

const app = createApp(App);

app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus);
app.use(router);
app.mount('#app');