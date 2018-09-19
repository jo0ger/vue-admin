import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/categories')
export class CategoryApi extends Api {
    public list (params: WebApi.CategoryModule.list.Req) {
        type Req = WebApi.CategoryModule.list.Req
        type Res = WebApi.CategoryModule.list.Res
        return this.get<Req, Res>('', params)
    }

    public item (id: string) {
        type Res = WebApi.CategoryModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public create (data: WebApi.CategoryModule.create.Req) {
        type Req = WebApi.CategoryModule.create.Req
        type Res = WebApi.CategoryModule.create.Res
        return this.post<Req, Res>('', data)
    }

    public update (id: string, data: WebApi.CategoryModule.update.Req) {
        type Req = WebApi.CategoryModule.update.Req
        type Res = WebApi.CategoryModule.update.Res
        return this.patch<Req, Res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type Res = WebApi.CategoryModule.deleteItem.Res
        return this.delete<Res>(`/${id}`)
    }
}

export default new CategoryApi()
