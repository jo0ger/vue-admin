import '@/registerServiceWorker'
import 'normalize.css'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from '@/App.vue'
import router, { connectStore } from '@/router'
import store from '@/store'
import { IS_PROD } from '@/config'
import { Component } from '@/utils/decorators'
import iView from 'iview'
import iEditor from 'iview-editor'
import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css'
import '@/assets/style/index.styl'
import { Container } from '@/components/common'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Vue.config.productionTip = IS_PROD

Vue.use(VueMeta, {
    keyName: 'head',
})
Vue.use(iView)
Vue.use(iEditor)

connectStore(store)

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
])

Vue.component('Container', Container)

if (IS_PROD) {
    Raven
        .config('https://17bb196a2fee4086a3731696b69be634@sentry.io/1291386')
        .addPlugin(RavenVue, Vue)
        .install()
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
