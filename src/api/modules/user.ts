///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/users')
export class UserApi extends Api {
    public list (params: WebApi.UserModule.list.req) {
        type req = WebApi.UserModule.list.req
        type res = WebApi.UserModule.list.res
        return this.get<req, res>('', params)
    }

    public item (id: string) {
        type req = WebApi.UserModule.item.req
        type res = WebApi.UserModule.item.res
        return this.get<req, res>(`/${id}`)
    }

    public update (id: string, data: WebApi.UserModule.update.req) {
        type req = WebApi.UserModule.update.req
        type res = WebApi.UserModule.update.res
        return this.patch<req, res>(`/${id}`, data)
    }
}

export default new UserApi()
