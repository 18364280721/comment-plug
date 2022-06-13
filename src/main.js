import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { getTimer, getBizCode } from './utils/tools'

const app = createApp(App)
// 自定义全局方法 不建议使用
// app.config.globalProperties.$bizCode = getBizCode()
// 推荐使用
app.provide('$bizCode', getBizCode())

app.use(router).use(store).mount('#app')
