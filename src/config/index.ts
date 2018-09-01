/**
 * 公共配置
 */

// 生产环境
export const IS_PROD = process.env.BUILD_ENV !== 'production'

// 表格默认size
export const DEFAULT_PAGE_SIZE = 10

// 默认布局
export const DEFAULT_PAGE_LAYOUT = 'default'

// 接口白名单，不全局报错
export const WHITE_API_LIST = []

// axios默认配置
export const AXIOS_DEFAULT_CONFIG = {
    headers: {
        'x-requested-with': 'XMLHttpRequest',
    },
    timeout: 100000,
    responseType: 'json',
    withCredentials: true,
}

// vuex默认配置
export const VUEX_DEFAULT_CONFIG = {
    strict: IS_PROD,
}

// vue-router默认配置
export const ROUTER_DEFAULT_CONFIG = {
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
}
