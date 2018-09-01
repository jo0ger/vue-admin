///<reference path="../typings/api.d.ts"/>

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { merge } from '@/utils'
import { IS_PROD, WHITE_API_LIST, AXIOS_DEFAULT_CONFIG } from '@/config'

export default class Http {
    public static client: AxiosInstance
    public static apiHost: string = IS_PROD ? 'https://api.jooger.me' : 'http://127.0.0.1:3002'

    constructor () {
        this.createAxios()
    }

    private createAxios () {
        if (Http.client) {
            return Http.client
        }
        const client = axios.create(merge({}, AXIOS_DEFAULT_CONFIG, {
            baseURL: Http.apiHost,
            headers: this.processHeader(),
            transformRequest: [
                (data: any) => data,
            ],
            transformResponse: [
                (data: any) => {
                    if (data) {
                        return data
                    }
                    throw new Error('网络错误')
                },
            ],
        }))
        client.interceptors.request.use(config => this.processRequest(config), err => Promise.reject(err))
        client.interceptors.response.use(response => this.processResponse(response), err => this.processError(err))
        Http.client = client
    }

    private processRequest (config: AxiosRequestConfig) {
        return {
            ...config,
            data: this.processData(config.data, config.method),
            params: this.processData(config.params, config.method),
        }
    }

    private processResponse (response: AxiosResponse<WebApi.IResponse>) {
        let errMsg = '接口错误，请稍后重试'
        if (!response || !response.data) { throw new Error(errMsg) }
        if (response.data.code) {
            // 如果在白名单内，就不全局处理了
            if (response.request.url && !WHITE_API_LIST.some(item => response.request.url.includes(item))) {
                errMsg = response.data.message || errMsg
                // TODO: message tip error
                throw new Error(errMsg)
            }
        }
        return response
    }

    private processError (err: AxiosError) {
        if (err.response && err.response.status === 401) {
            // TODO: 401 to login page
            return
        }
        // 如果是手动取消的请求，不显示错误信息
        if (axios.isCancel(err)) {
            console.log(err)
        } else {
            // TODO: message tip network error
        }
        throw err
    }

    private processHeader () {
        return {
            'Content-Type': 'application/json',
        }
    }

    private processData (data: any, method?: string) {
        if (!data) { return null }
        let payload = data
        if (payload instanceof FormData) {
            // pass
        } else if (method === 'post') {
            payload = JSON.stringify(data)
        }
        return payload
    }
}
