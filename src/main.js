import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/main.css';

Vue.config.productionTip = false;

if (CSS.supports('height', '100dvh')) {
  document.documentElement.style.setProperty('--dynamic-height', '100dvh');
} else {
  document.documentElement.style.setProperty('--dynamic-height', '100vh');
}
// 有性能问题！
// function setDynamicHeight() {
//   const height = window.innerHeight;
//   document.documentElement.style.setProperty('--dynamic-height', `${height}px`);
// }

// // Set the initial height
// setDynamicHeight();

// // Update the height on resize
// window.addEventListener('resize', setDynamicHeight);
// window.addEventListener('orientationchange', setDynamicHeight);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
