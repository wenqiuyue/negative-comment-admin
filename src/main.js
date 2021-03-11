import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import components from './components'; // 自定义模板
import VEmojiPicker from 'v-emoji-picker';
import VueClipboard from 'vue-clipboard2';


import _ from "lodash";

import * as api from './api/index';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont';
import './assets/iconfont/iconfont.css';
import "./utils/extend";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(components);
Vue.use(VEmojiPicker);
Vue.use(VueClipboard);

Vue.prototype.$apiHttp = api;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
