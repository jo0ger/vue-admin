///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/articles')
export class ArticleApi extends Api {
    public list (params: WebApi.ArticleModule.list.req) {
        type req = WebApi.ArticleModule.list.req
        type res = WebApi.ArticleModule.list.res
        return this.get<req, res>('', params)
    }

    public item (id: string) {
        type req = WebApi.ArticleModule.item.req
        type res = WebApi.ArticleModule.item.res
        return this.get<req, res>(`/${id}`)
    }

    public archives () {
        type req = WebApi.ArticleModule.archives.req
        type res = WebApi.ArticleModule.archives.res
        return this.get<req, res>('/archives')
    }

    public create (data: WebApi.ArticleModule.create.req) {
        type req = WebApi.ArticleModule.create.req
        type res = WebApi.ArticleModule.create.res
        return this.post<req, res>('', data)
    }

    public update (id: string, data: WebApi.ArticleModule.update.req) {
        type req = WebApi.ArticleModule.update.req
        type res = WebApi.ArticleModule.update.res
        return this.patch<req, res>(`/${id}`, data)
    }

    public like (id: string) {
        type req = WebApi.ArticleModule.like.req
        type res = WebApi.ArticleModule.like.res
        return this.patch<req, res>(`/${id}/like`)
    }

    public unlike (id: string) {
        type req = WebApi.ArticleModule.unlike.req
        type res = WebApi.ArticleModule.unlike.res
        return this.patch<req, res>(`/${id}/unlike`)
    }

    public deleteItem (id: string) {
        type req = WebApi.ArticleModule.deleteItem.req
        type res = WebApi.ArticleModule.deleteItem.res
        return this.delete<res>(`/${id}`)
    }
}

export default new ArticleApi()
