/**
 * @desc LinkList
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 18:23:20
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'

const sMod = namespace('setting')

const getDefModel = () => ({
    id: '',
    name: '',
    site: '',
    avatar: '',
    slogan: '',
    github: '',
})

@Component({
    name: 'LinkList',
})
export default class LinkList extends Vue {
    @sMod.Action('update') public updateSetting

    private linkColResponsiveProps = {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 8,
    }

    private linkDialogVisible: boolean = false

    private model = getDefModel()

    private addLink () {
        this.linkDialogVisible = true
    }

    private async submit () {
        if (!this.model.name && !this.model.github) {
            return this.$Message.warning('名称和Github必填其一')
        }
        const links = this.setting.site.links.slice()
        if (this.model.id) {
            // 更新
            const hitIndex = links.findIndex(link => link.id === this.model.id)
            links.splice(hitIndex, 1, Object.assign(this.model))
        } else {
            links.push(Object.assign(this.model))
        }
        const success = await this.updateSetting({
            site: { links },
        })
        if (success) {
            this.close()
        }
    }

    private async editLink (link) {
        this.linkDialogVisible = true
        Object.assign(this.model, link)
    }

    private async deleteLink (link, index) {
        const links = this.setting.site.links.slice()
        links.splice(index, 1)
        await this.updateSetting({
            site: { links },
        })
    }

    private close () {
        this.linkDialogVisible = false
        this.model = getDefModel()
    }
}
