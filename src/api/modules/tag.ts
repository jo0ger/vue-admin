///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/tags')
export class TagApi extends Api {
    public list (params: WebApi.TagModule.list.Req) {
        type Req = WebApi.TagModule.list.Req
        type Res = WebApi.TagModule.list.Res
        return this.get<Req, Res>('', params)
    }

    public item (id: string) {
        type Res = WebApi.TagModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public create (data: WebApi.TagModule.create.Req) {
        type Req = WebApi.TagModule.create.Req
        type Res = WebApi.TagModule.create.Res
        return this.post<Req, Res>('', data)
    }

    public update (id: string, data: WebApi.TagModule.update.Req) {
        type Req = WebApi.TagModule.update.Req
        type Res = WebApi.TagModule.update.Res
        return this.patch<Req, Res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type Res = WebApi.TagModule.deleteItem.Res
        return this.delete<Res>(`/${id}`)
    }
}

export default new TagApi()
