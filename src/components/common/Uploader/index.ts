/**
 * @desc Uploader
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 00:30:16
 */

import Vue from '@/vue'
import { Component, Prop } from '@/utils/decorators'
import { getAliOssClient } from '@/lazyload'

@Component({
    name: 'Uploader',
})
export default class Uploader extends Vue {
    @Prop({ default: new Date().getTime().toString() })
    private name!: string

    @Prop({ default: '' })
    private url!: string

    @Prop({ default: 'file' })
    private type!: string

    private ossClient: any = null
    private file: any = null
    private uploading: boolean = false

    private typeMap = {
        file: {
            accept: '',
            text: '文件',
            dir: 'file/',
        },
        image: {
            accept: 'image/*',
            text: '图片',
            dir: 'img/',
        },
    }

    private get accept () {
        return this.typeMap[this.type].accept
    }

    private beforeUpload (file) {
        this.file = file
        this.upload()
        return false
    }

    private async upload () {
        if (this.uploading) return
        if (!this.file) {
            return this.$Message.warning('请选择' + this.typeMap[this.type].text)
        }
        this.uploading = true
        const filename = this.file.name.split('.').join(`_${new Date().getTime()}.`)
        const client = await getAliOssClient(this.setting.keys.aliyun)
        const res = await client.multipartUpload(this.typeMap[this.type].dir + this.name + filename, this.file)
        this.uploading = false
        this.$emit('on-success', res.url)
    }
}
