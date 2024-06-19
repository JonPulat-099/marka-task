
import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/main.css'
import 'ant-design-vue/dist/reset.css';

const pinia = createPinia()

createApp(App).use(pinia).use(Antd).mount('#app')
