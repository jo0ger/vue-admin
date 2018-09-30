import OSS from 'ali-oss'
import { CDN } from '@/config'

export default class AliOSS {
    public client: any = null

    constructor (opt) {
        this.client = new OSS(opt)
    }

    public async multipartUpload (name, file, opt?: any) {
        const res = await this.client.put(name, file, opt)
        return {
            url: (res.url || res.res.requestUrls[0]).replace(
                `http://${this.client.options.bucket}.${this.client.options.region}.aliyuncs.com`,
                CDN,
            ) || '',
        }
    }
}
