import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
import 'default-passive-events'
import {ElementPlusUseLang} from './util/elementLocale'
import directives from './directives/index.js'

const app = createApp(App);
// 转换语言
ElementPlusUseLang(app, ref,ElementPlus,zhLocale)
directives(app);
app.use(store).use(router).use(ElementPlus).mount('#app')
