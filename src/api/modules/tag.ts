///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/tags')
export class TagApi extends Api {
    public list (params: WebApi.TagModule.list.req) {
        type req = WebApi.TagModule.list.req
        type res = WebApi.TagModule.list.res
        return this.get<req, res>('', params)
    }

    public item (id: string) {
        type req = WebApi.TagModule.item.req
        type res = WebApi.TagModule.item.res
        return this.get<req, res>(`/${id}`)
    }

    public create (data: WebApi.TagModule.create.req) {
        type req = WebApi.TagModule.create.req
        type res = WebApi.TagModule.create.res
        return this.post<req, res>('', data)
    }

    public update (id: string, data: WebApi.TagModule.update.req) {
        type req = WebApi.TagModule.update.req
        type res = WebApi.TagModule.update.res
        return this.patch<req, res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type req = WebApi.TagModule.deleteItem.req
        type res = WebApi.TagModule.deleteItem.res
        return this.delete<res>(`/${id}`)
    }
}

export default new TagApi()
