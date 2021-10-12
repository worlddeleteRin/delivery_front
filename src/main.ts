import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueLazyLoad  from "vue3-lazyload";
// import main styles file
import "./main.css"
import 'mosha-vue-toastify/dist/style.css'

import { api_url, static_url } from './settings'

// import for global components
import { Icon } from '@iconify/vue';

// Element Plus components
import { ElAffix } from 'element-plus';
import 'element-plus/dist/index.css';

//import ElementPlus from 'element-plus';

const app = createApp(App)

// add app global properties
app.config.globalProperties.api_url = api_url
app.config.globalProperties.static_url = static_url

// element plus components
//app.use(ElementPlus)
app.use(ElAffix)
//app.use(ElementPlus)
// eof app global properties
// global components
app.component('Icon', Icon)

// add vue observer directive


app.use(store)
app.use(router)
app.use(VueLazyLoad)

app.mount("#app");
