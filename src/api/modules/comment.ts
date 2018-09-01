///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/comments')
export class CommentApi extends Api {
    public list (params: WebApi.CommentModule.list.req) {
        type req = WebApi.CommentModule.list.req
        type res = WebApi.CommentModule.list.res
        return this.get<req, res>('', params)
    }

    public item (id: string) {
        type req = WebApi.CommentModule.item.req
        type res = WebApi.CommentModule.item.res
        return this.get<req, res>(`/${id}`)
    }

    public create (data: WebApi.CommentModule.create.req) {
        type req = WebApi.CommentModule.create.req
        type res = WebApi.CommentModule.create.res
        return this.post<req, res>('', data)
    }

    public update (id: string, data: WebApi.CommentModule.update.req) {
        type req = WebApi.CommentModule.update.req
        type res = WebApi.CommentModule.update.res
        return this.patch<req, res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type req = WebApi.CommentModule.deleteItem.req
        type res = WebApi.CommentModule.deleteItem.res
        return this.delete<res>(`/${id}`)
    }

    public like (id: string) {
        type req = WebApi.CommentModule.like.req
        type res = WebApi.CommentModule.like.res
        return this.patch<req, res>(`/${id}/like`)
    }

    public unlike (id: string) {
        type req = WebApi.CommentModule.unlike.req
        type res = WebApi.CommentModule.unlike.res
        return this.patch<req, res>(`/${id}/unlike`)
    }
}

export default new CommentApi()
