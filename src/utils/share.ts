import {
    Store,
} from 'vuex'
import dayjs from 'dayjs'

import {
    cloneDeep,
    merge,
    isArray,
    isNumber,
    isFunction,
    isObject,
    isRegExp,
    isString,
    isSet,
    isMap,
    isDate,
} from 'lodash'

export {
    cloneDeep,
    merge,
    isArray,
    isNumber,
    isFunction,
    isObject,
    isRegExp,
    isString,
    isSet,
    isMap,
    isDate,
}

export const moment = dayjs

/* tslint:disable:no-empty */
export const noop = () => {}

export const capitalize = cached((str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
})

export const isEmptyObject = (obj?: object) => {
    if (typeof obj !== 'object') {
        return false
    }
    /* eslint-disable */
    /* tslint:disable */
    for (let key in obj) {
        return false
    }
    return true
}

// 获取分辨率
export const detectResolution = (blobURL: string) => {
    return new Promise(resolve => {
        let img = new Image()
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height
            })
        }
        img.src = blobURL
    })
}

/**
 * 数据缓存
 * @param  {Function} fn
 * @example
 *  const match = cached((args) => { ... })
 *  match(args)
 */
export function cached (fn: Function) {
    const cache = Object.create(null)
    return function cachedFn (str: string, ...rest: any[]) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str, ...rest))
    }
}

/**
 * 过滤掉无效值，接口提交的时候可以用来过滤掉无效值
 * @param  {Array | Object} query={}
 */
export const processModel = (query: any = {}) => {
    const isArr = Array.isArray(query)
    if (isArr) {
        return query.filter(item => !['', undefined].includes(item))
    }
    return Object.keys(query).reduce((m, key) => {
        let val = query[key]
        // undefined和''不传入
        if (!['', undefined].includes(val)) {
            if (isDate(val)) {
                val = moment(val).format('YYYY-MM-DD HH:mm:ss')
            } else if (Array.isArray(val) || isObject(val)) {
                val = processModel(val)
            }
            m[key] = val
        }
        return m
    }, {})
}


/**
 * @desc 监听store上的user
 * @param store Store
 * @param once 只监听一次
 */
export const watchUser = (store: Store<any>, once: boolean = true): Promise<any> => {
    return new Promise(resolve => {
        const unwatch = store.watch(state => state.app.user.data, user => {
            once && unwatch()
            resolve(user)
        })
    })
}

export const findExtendsItem = (ext, key) => {
    const hit = ext.find(item => item.key === key)
    return hit && hit.value || ''
}
