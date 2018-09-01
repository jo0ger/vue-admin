import Vue from 'vue';
import App from '@/App';
import router, { connectStore } from '@/router';
import store from '@/store';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

connectStore(store)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
