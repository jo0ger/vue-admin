///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/notifications')
export class NotificationApi extends Api {
    public list (params: WebApi.NotificationModule.list.req) {
        type req = WebApi.NotificationModule.list.req
        type res = WebApi.NotificationModule.list.res
        return this.get<req, res>('', params)
    }

    public item (id: string) {
        type req = WebApi.NotificationModule.item.req
        type res = WebApi.NotificationModule.item.res
        return this.get<req, res>(`/${id}`)
    }

    public view (id: string) {
        type req = WebApi.NotificationModule.view.req
        type res = WebApi.NotificationModule.view.res
        return this.patch<req, res>(`/${id}/view`)
    }

    public viewAll () {
        type req = WebApi.NotificationModule.viewAll.req
        type res = WebApi.NotificationModule.viewAll.res
        return this.patch<req, res>('/view')
    }

    public deleteItem (id: string) {
        type req = WebApi.NotificationModule.deleteItem.req
        type res = WebApi.NotificationModule.deleteItem.res
        return this.delete<res>(`/${id}`)
    }
}

export default new NotificationApi()
