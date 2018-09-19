import Api from '@/api/api'
import { Controller } from '@/utils/decorators'

@Controller('/stat')
export class StatApi extends Api {
    public count () {
        type Res = WebApi.StatModule.count.Res
        return this.get<null, Res>('/count')
    }

    public trend (params: WebApi.StatModule.trend.Req) {
        type Req = WebApi.StatModule.trend.Req
        type Res = WebApi.StatModule.trend.Res
        return this.get<Req, Res>('/trend', params)
    }
}

export default new StatApi()
