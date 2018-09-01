///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/auth')
export class AuthApi extends Api {
    public info () {
        type req = WebApi.AuthModule.info.req
        type res = WebApi.AuthModule.info.res
        return this.get<req, res>('/info')
    }

    public login (data: WebApi.AuthModule.login.req) {
        type req = WebApi.AuthModule.login.req
        type res = WebApi.AuthModule.login.res
        return this.post<req, res>('/login', data)
    }

    public logout () {
        type req = WebApi.AuthModule.logout.req
        type res = WebApi.AuthModule.logout.res
        return this.get<req, res>('/logout')
    }

    public update (data: WebApi.AuthModule.update.req) {
        type req = WebApi.AuthModule.update.req
        type res = WebApi.AuthModule.update.res
        return this.patch<req, res>('/info', data)
    }

    public password (data: WebApi.AuthModule.password.req) {
        type req = WebApi.AuthModule.password.req
        type res = WebApi.AuthModule.password.res
        return this.patch<req, res>('/password', data)
    }
}

export default new AuthApi()
