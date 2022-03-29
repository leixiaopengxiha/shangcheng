import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css';
import 'default-passive-events'
import directives from'./directives/index.js'

let app = createApp(App);
directives(app);
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')
