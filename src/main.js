import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueWorker from 'vue-worker'
// global styles
require('@/styles/global.scss');

import * as WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Work Sans','Material Icons']
  },
  timeout: 10000, // 10 seconds of timout
});

Vue.use(VueWorker);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
