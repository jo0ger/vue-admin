import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/moments')
export class MomentApi extends Api {
    public list (params: WebApi.MomentModule.list.Req) {
        type Req = WebApi.MomentModule.list.Req
        type Res = WebApi.MomentModule.list.Res
        return this.get<Req, Res>('', params)
    }

    public item (id: string) {
        type Res = WebApi.MomentModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public create (data: WebApi.MomentModule.create.Req) {
        type Req = WebApi.MomentModule.create.Req
        type Res = WebApi.MomentModule.create.Res
        return this.post<Req, Res>('', data)
    }

    public update (id: string, data: WebApi.MomentModule.update.Req) {
        type Req = WebApi.MomentModule.update.Req
        type Res = WebApi.MomentModule.update.Res
        return this.patch<Req, Res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type Res = WebApi.MomentModule.deleteItem.Res
        return this.delete<Res>(`/${id}`)
    }
}

export default new MomentApi()
