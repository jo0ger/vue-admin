/**
 * @desc LimitSetting
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-11 23:35:32
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'

const { Action } = namespace('setting')

@Component({
    name: 'LimitSetting',
})
export default class LimitSetting extends Vue {
    @Action('update') public updateSetting

    private async submit () {
        await this.updateSetting({
            limit: {
                ...this.setting.limit,
            },
        })
    }
}