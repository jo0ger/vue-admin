import 'normalize.css'
import Vue from 'vue'
import App from '@/App'
import router, { connectStore } from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import '@/assets/style/index.styl'

Vue.config.productionTip = false

connectStore(store)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
