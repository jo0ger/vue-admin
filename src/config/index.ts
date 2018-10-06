/**
 * 公共配置
 */

// 生产环境
export const IS_PROD = process.env.NODE_ENV === 'production'

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
        'Accept': 'application/json',
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
    mode: 'hash',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
}

export const AUTH_TOKEN_KEY = 'node-server_token'

export const AUTH_CACHE_KEY = 'jooger.me.info'

export const SITE = 'https://jooger.me'

export const CDN = 'https://static.jooger.me'

export const DEFAULT_AVATAR = CDN + '/img/common/avatar.png'

export const UPLOAD_NAME = {
    LOGO: `${IS_PROD ? 'common' : 'test'}/logo/`,
    AUTH: `${IS_PROD ? 'common' : 'test'}/avatar/`,
    CATEGORY: `${IS_PROD ? 'common' : 'test'}/category/`,
    ARTICLE_THUMB () {
        return `${IS_PROD ? 'source' : 'test'}/${this.moment().format('YYYYMMDD')}/`
    },
}
