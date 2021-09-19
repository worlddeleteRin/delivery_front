import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueLazyLoad  from "vue3-lazyload";
// import main styles file
import "./main.css"
import 'mosha-vue-toastify/dist/style.css'

import { api_url, static_url } from './settings'

const app = createApp(App)

// add app global properties
app.config.globalProperties.api_url = api_url
app.config.globalProperties.static_url = static_url
// eof app global properties

app.use(store)
app.use(router)
app.use(VueLazyLoad)

app.mount("#app");
