/**
 * @desc Detail
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 15:24:15
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'
import { MDEditor, Uploader, CTDialog, TagList } from "@/components/common"

const cMod = namespace('category')
const tMod = namespace('tag')

@Component({
    name: 'Detail',
    components: {
        MDEditor,
        Uploader,
        CTDialog,
        TagList,
    },
})
export default class Detail extends Vue {
    @cMod.Getter('list') private cList
    @cMod.Action('getList') private getCList
    @tMod.Getter('list') private tList
    @tMod.Action('getList') private getTList

    private model: WebApi.ArticleModule.Article = {
        title: '',
        description: '',
        state: 0,
        source: 0,
        keywords: [],
        thumb: '',
        category: '',
        tag: [],
    }

    private cDialogVisible = false
    private tDialogVisible = false

    private get uploadName () {
        return `test/${this.moment().format('YYYYMMDD')}/`
    }

    private created () {
        this.getCList()
        this.getTList()
        if (this.$route.params.id) {
            // 编辑页
            this.getDetail()
        }
    }

    private async getDetail () {
        const res = await this.api.article.item(this.$route.params.id)
        if (res.success) {
            this.model = res.data
        } else {
            this.$Message.error(res.message)
        }
    }

    private async validate () {
        const [v1, v2] = await Promise.all(
            ['baseInfoForm', 'classifyForm'].map(key => {
                return new Promise(resolve => {
                    (this.$refs[key] as any).validate(resolve)
                })
            })
        )
        return v1 && v2
    }

    private async create () {
        const res = await this.api.article.create(
            this.processModel(this.model)
        )
        if (res.success) {
            this.$router.push({ name: 'Article' })
        }
        return res
    }

    private async update () {
        const res = await this.api.article.update(
            this.$route.params.id,
            this.processModel(this.model)
        )
        if (res.success) {
            this.$router.back()
        }
        return res
    }

    private async submit () {
        if (!await this.validate()) return
        const res: any = await (this.$route.params.id ? this.update : this.create)()
        if (res.success) {
            this.$Message.success(res.message)
        } else {
            this.$Message.error(res.message)
        }
    }

    private uploadSuccess (thumb) {
        this.model.thumb = thumb
    }

    private deleteThumb () {
        this.model.thumb = ''
    }

    private get rule () {
        return {
            title: [
                { required: true, message: '请填写标题' }
            ],
            description: [
                { required: true, message: '请填写简介' }
            ],
            category: [
                { required: true, message: '请选择分类' }
            ],
            tag: [
                { required: true, type: 'array', min: 1, message: '请选择标签', trigger: 'change' }
            ]
        }
    }
}