///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/notifications')
export class NotificationApi extends Api {
    public list (params: WebApi.NotificationModule.list.Req) {
        type Req = WebApi.NotificationModule.list.Req
        type Res = WebApi.NotificationModule.list.Res
        return this.get<Req, Res>('', params)
    }

    public item (id: string) {
        type Res = WebApi.NotificationModule.item.Res
        return this.get<null, Res>(`/${id}`)
    }

    public view (id: string) {
        type Res = WebApi.NotificationModule.view.Res
        return this.patch<null, Res>(`/${id}/view`)
    }

    public viewAll () {
        type Res = WebApi.NotificationModule.viewAll.Res
        return this.patch<null, Res>('/view')
    }

    public deleteItem (id: string) {
        type Res = WebApi.NotificationModule.deleteItem.Res
        return this.delete<Res>(`/${id}`)
    }
}

export default new NotificationApi()
