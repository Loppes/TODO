
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from '@/router/index.js' 

import { Icon } from '@iconify/vue'

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "To-do"
    next()
})

const app = createApp(App)

app.component('Icon', Icon)
app.use(router)

app.mount('#app')

