import '@/registerServiceWorker'
import 'normalize.css'
import Vue from 'vue'
import App from '@/App.vue'
import router, { connectStore } from '@/router'
import store from '@/store'
import { IS_PROD } from '@/config'
import { Component } from '@/utils/decorators'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/style/index.styl'

Vue.config.productionTip = IS_PROD

Vue.use(iView)

connectStore(store)

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
])

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
