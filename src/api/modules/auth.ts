import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/auth')
export class AuthApi extends Api {
    public info () {
        type Res = WebApi.AuthModule.info.Res
        return this.get<null, Res>('/info')
    }

    public login (data: WebApi.AuthModule.login.Req) {
        type Req = WebApi.AuthModule.login.Req
        type Res = WebApi.AuthModule.login.Res
        return this.post<Req, Res>('/login', data)
    }

    public logout () {
        type Res = WebApi.AuthModule.logout.Res
        return this.get<null, Res>('/logout')
    }

    public update (data: WebApi.AuthModule.update.Req) {
        type Req = WebApi.AuthModule.update.Req
        type Res = WebApi.AuthModule.update.Res
        return this.patch<Req, Res>('/info', data)
    }

    public password (data: WebApi.AuthModule.password.Req) {
        type Req = WebApi.AuthModule.password.Req
        type Res = WebApi.AuthModule.password.Res
        return this.patch<Req, Res>('/password', data)
    }
}

export default new AuthApi()
