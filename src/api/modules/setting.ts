///<reference path="../../typings/api.d.ts" />

import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/setting')
export class SettingApi extends Api {
    public getData () {
        type req = WebApi.SettingModule.getData.req
        type res = WebApi.SettingModule.getData.res
        return this.get<req, res>('')
    }

    public update (id: string, data: WebApi.SettingModule.update.req) {
        type req = WebApi.SettingModule.update.req
        type res = WebApi.SettingModule.update.res
        return this.patch<req, res>(`/${id}`, data)
    }
}

export default new SettingApi()
