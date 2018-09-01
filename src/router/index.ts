import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import { ROUTER_DEFAULT_CONFIG } from '@/config'
import { watchUser, merge, isRegExp, isString, isFunction } from '@/utils'

Vue.use(Router);

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
]

const router = new Router(merge({}, ROUTER_DEFAULT_CONFIG, { routes }))

export default router

export function connectStore (store) {
    router.beforeEach(async (to, from, next) => {
        next()
    })
    router.afterEach(async (to, from) => {
        try {
            const defaultComp: any = to.matched[0].components.default
            const layout = defaultComp.options.layout
            store.commit('app/APPLY_LAYOUT', layout)
        } catch (e) {
            // pass
        }
    })
}
