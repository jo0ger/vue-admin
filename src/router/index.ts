import Vue from 'vue'
import Router from 'vue-router'
import { ROUTER_DEFAULT_CONFIG } from '@/config'
import { merge } from '@/utils'
import { Message, LoadingBar } from 'iview'
import routes from './routes'

Vue.use(Router)

const router = new Router(merge({}, ROUTER_DEFAULT_CONFIG, { routes }))

export default router

export function connectStore (store) {
    router.beforeEach(async (to, from, next) => {
        LoadingBar.start()
        if (!store.getters['auth/isLogin']) {
            await store.dispatch('auth/getInfo')
        }
        if (store.getters['auth/isLogin']) {
            // 已登录
            if (to.name === 'Login') {
                // 已登录 && To login page
                Message.info('已登录')
                if (from.name) {
                    // 从别的页面通过路由跳转（浏览器前进后退）
                    LoadingBar.finish()
                    return next(false)
                } else {
                    // 直接从地址栏输入/login回车跳转
                    return next({ name: 'Dashboard' })
                }
            }
        } else {
            // 未登录
            if (to.name !== 'Login') {
                if (from.name) {
                    Message.warning('请先登录')
                }
                if (from.name === 'Login') {
                    LoadingBar.finish()
                    return next(false)
                }
                const query: any = {}
                if (to.name) {
                    query.redirect_uri_name = to.name
                }
                if (Object.keys(to.params).length) {
                    query.redirect_params = JSON.stringify(to.params)
                }
                if (Object.keys(to.query).length) {
                    query.redirect_query = JSON.stringify(to.query)
                }
                return next({ name: 'Login', query })
            }
        }
        next()
    })
    router.afterEach(async (to, from) => {
        if (to.name === 'Error') {
            LoadingBar.error()
        } else {
            LoadingBar.finish()
        }
        try {
            const defaultComp: any = to.matched[0].components.default
            const layout = defaultComp.options.layout
            store.commit('app/APPLY_LAYOUT', layout)
        } catch (e) {
            // pass
        }
    })
}
