import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import store from './store'
import router from './router'
import { i18n } from './lang'
import { getTimer, getBizCode } from './utils/tools'

const app = createApp(App)
const painia = createPinia()

// 自定义全局方法 不建议使用
// app.config.globalProperties.$bizCode = getBizCode()
// 推荐使用provide inject
app.provide('$bizCode', getBizCode())
app.provide('$getTimer', getTimer())

app.use(painia).use(router).use(i18n).mount('#app')
