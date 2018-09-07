import OSS from 'ali-oss'
import { CDN } from '@/config'

export default class AliOSS {
    private client: any = null

    constructor (opt) {
        this.client = new OSS(opt)
    }

    private async multipartUpload (name, file, opt) {
        const res = await this.client.multipartUpload(name, file, opt)
        return {
            url: res.res.requestUrls[0].replace(`http://${this.client.options.bucket}.${this.client.options.region}.aliyuncs.com`, CDN) || ''
        }
    }
}
