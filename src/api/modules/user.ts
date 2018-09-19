import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/users')
export class UserApi extends Api {
    public list () {
        type Res = WebApi.UserModule.list.Res
        return this.get<null, Res>('')
    }

    public item (id: string) {
        type Res = WebApi.UserModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public update (id: string, data: WebApi.UserModule.update.Req) {
        type Req = WebApi.UserModule.update.Req
        type Res = WebApi.UserModule.update.Res
        return this.patch<Req, Res>(`/${id}`, data)
    }
}

export default new UserApi()
