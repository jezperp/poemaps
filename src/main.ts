import './assets/styles.scss'

import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = `https://firestore.googleapis.com/v1/projects/poemaps-c9dcb/databases/(default)/documents/`

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
