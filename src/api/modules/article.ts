///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/articles')
export class ArticleApi extends Api {
    public list (params: WebApi.ArticleModule.list.Req) {
        type Req = WebApi.ArticleModule.list.Req
        type Res = WebApi.ArticleModule.list.Res
        return this.get<Req, Res>('', params)
    }

    public item (id: string) {
        type Res = WebApi.ArticleModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public archives () {
        type Res = WebApi.ArticleModule.archives.Res
        return this.get<null, Res>('/archives')
    }

    public create (data: WebApi.ArticleModule.create.Req) {
        type Req = WebApi.ArticleModule.create.Req
        type Res = WebApi.ArticleModule.create.Res
        return this.post<Req, Res>('', data)
    }

    public update (id: string, data: WebApi.ArticleModule.update.Req) {
        type Req = WebApi.ArticleModule.update.Req
        type Res = WebApi.ArticleModule.update.Res
        return this.patch<Req, Res>(`/${id}`, data)
    }

    public like (id: string) {
        type Res = WebApi.ArticleModule.like.Res
        return this.patch<null, Res>(`/${id}/like`)
    }

    public unlike (id: string) {
        type Res = WebApi.ArticleModule.unlike.Res
        return this.patch<null, Res>(`/${id}/unlike`)
    }

    public deleteItem (id: string) {
        type Res = WebApi.ArticleModule.deleteItem.Res
        return this.delete<Res>(`/${id}`)
    }
}

export default new ArticleApi()
