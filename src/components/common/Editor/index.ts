/**
 * @desc Editor
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-12-06 19:21:01
 */

import Vue from '@/vue'
import { Component, Prop } from '@/utils/decorators'
import { Uploader } from '@/components/common'

@Component({
    name: 'Editor',
})
export default class Editor extends Vue {
    @Prop()
    private value!: string

    @Prop()
    private uploadName!: string

    private get content () {
        return this.value
    }

    private set content (val) {
        this.$emit('input', val)
    }

    private beforeUpload (file) {
        this.upload(file)
        return false
    }

    private async upload (file) {
        if (!file) {
            return this.$Message.warning('请选择图片')
        }
        const filename = file.name.split('.').join(`_${new Date().getTime()}.`)
        const res = await this.$alioss.multipartUpload(
            (Uploader as any).uploadTypeMap.image.dir + this.uploadName + filename,
            file,
        )
        const url = res.url as string
        (this.$refs.editor as any).handleUploadSuccess(url)
        return false
    }
}
