/**
 * @desc LinkList
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 18:23:20
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'

const sMod = namespace('setting')

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

    private model = {
        name: '',
        site: '',
        github: '',
    }

    private addLink () {
        this.linkDialogVisible = true
    }

    private async submit () {
        if (!this.model.name && !this.model.github) {
            return this.$Message.warning('名称和Github必填其一')
        }
        const success = await this.updateSetting({
            site: {
                links: this.setting.site.links.concat(this.model),
            },
        })
        if (success) {
            this.close()
        }
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
        this.model = {
            name: '',
            site: '',
            github: '',
        }
    }
}