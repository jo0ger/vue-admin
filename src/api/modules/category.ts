///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/categories')
export class CategoryApi extends Api {
    public list (params: WebApi.CategoryModule.list.req) {
        type req = WebApi.CategoryModule.list.req
        type res = WebApi.CategoryModule.list.res
        return this.get<req, res>('', params)
    }

    public item (id: string) {
        type req = WebApi.CategoryModule.item.req
        type res = WebApi.CategoryModule.item.res
        return this.get<req, res>(`/${id}`)
    }

    public create (data: WebApi.CategoryModule.create.req) {
        type req = WebApi.CategoryModule.create.req
        type res = WebApi.CategoryModule.create.res
        return this.post<req, res>('', data)
    }

    public update (id: string, data: WebApi.CategoryModule.update.req) {
        type req = WebApi.CategoryModule.update.req
        type res = WebApi.CategoryModule.update.res
        return this.patch<req, res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type req = WebApi.CategoryModule.deleteItem.req
        type res = WebApi.CategoryModule.deleteItem.res
        return this.delete<res>(`/${id}`)
    }
}

export default new CategoryApi()
