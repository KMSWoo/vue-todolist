import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/main.css';
// import { Button, Select } from 'element-ui'
// Vue.use(Button)
// Vue.use(Select)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
