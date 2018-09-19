import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/comments')
export class CommentApi extends Api {
    public list (params: WebApi.CommentModule.list.Req) {
        type Req = WebApi.CommentModule.list.Req
        type Res = WebApi.CommentModule.list.Res
        return this.get<Req, Res>('', params)
    }

    public item (id: string) {
        type Res = WebApi.CommentModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public create (data: WebApi.CommentModule.create.Req) {
        type Req = WebApi.CommentModule.create.Req
        type Res = WebApi.CommentModule.create.Res
        return this.post<Req, Res>('', data)
    }

    public update (id: string, data: WebApi.CommentModule.update.Req) {
        type Req = WebApi.CommentModule.update.Req
        type Res = WebApi.CommentModule.update.Res
        return this.patch<Req, Res>(`/${id}`, data)
    }

    public deleteItem (id: string) {
        type Res = WebApi.CommentModule.deleteItem.Res
        return this.delete<Res>(`/${id}`)
    }

    public like (id: string) {
        type Res = WebApi.CommentModule.like.Res
        return this.patch<null, Res>(`/${id}/like`)
    }

    public unlike (id: string) {
        type Res = WebApi.CommentModule.unlike.Res
        return this.patch<null, Res>(`/${id}/unlike`)
    }
}

export default new CommentApi()
