/**
 * @desc Uploader
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 00:30:16
 */

import Vue from '@/vue'
import { Component, Prop } from '@/utils/decorators'
import { AliOSS } from '@/utils'

@Component({
    name: 'Uploader',
})
export default class Uploader extends Vue {
    @Prop({ default: new Date().getTime().toString() })
    private name!: string

    @Prop({ default: '' })
    private url!: string

    private ossClient: any = null
    private file: any = null
    private uploading: boolean = false

    private getOssClient () {
        if (this.ossClient) return this.ossClient
        this.ossClient = new AliOSS(this.setting.keys.aliyun)
        return this.ossClient
    }

    private beforeUpload (file) {
        this.file = file
        this.upload()
        return false
    }

    private async upload () {
        if (this.uploading) return
        if (!this.file) {
            return this.$Message.warning('请选择图片')
        }
        this.uploading = true
        const filename = this.file.name.split('.').join(`_${new Date().getTime()}.`)
        const res = await this.getOssClient().multipartUpload('img/' + this.name + filename, this.file)
        this.uploading = false
        this.$emit('on-success', res.url)
    }
}