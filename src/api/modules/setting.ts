import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/setting')
export class SettingApi extends Api {
    public getData () {
        type Res = WebApi.SettingModule.getData.Res
        return this.get<null, Res>()
    }

    public update (data: WebApi.SettingModule.update.Req) {
        type Req = WebApi.SettingModule.update.Req
        type Res = WebApi.SettingModule.update.Res
        return this.patch<Req, Res>('', data)
    }
}

export default new SettingApi()
