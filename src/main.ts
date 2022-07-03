import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { transToKeyBase } from './utils';

const app = createApp(App)

// 全局注册图标，会牺牲一点性能
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon-${transToKeyBase(key)}`, component)
  // console.log([`el-icon-${transToKeyBase(key)}`, component]);
  
}


app.use(router).use(ElementPlus)
app.mount('#app')
