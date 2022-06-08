import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)
// 自定义方法
// app.config.globalProperties = ''

app.use(router).use(store).mount('#app')
