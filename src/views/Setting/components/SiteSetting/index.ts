/**
 * @desc SiteSetting
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-11 23:35:02
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'

const { Action } = namespace('setting')

@Component({
    name: 'SiteSetting',
})
export default class SiteSetting extends Vue {
    @Action('update') public updateSetting

    private async submit () {
        await this.updateSetting({
            site: {
                musicId: this.setting.site.musicId,
                welcome: this.setting.site.welcome,
            },
        })
    }
}