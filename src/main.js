import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
import {getRequest,postRequest} from "./utils/api";
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.prototype.$getRepquest=getRequest;
Vue.prototype.$postRequest=postRequest;
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
