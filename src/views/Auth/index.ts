/**
 * @desc Auth
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:54:03
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { DEFAULT_AVATAR } from '@/config'
import { Component } from '@/utils/decorators'
import { TagList, EditInput, Uploader } from '@/components/common'
import { LinkList, UpdatePassword } from './components'

const sMod = namespace('setting')
const aMod = namespace('auth')

@Component({
    name: 'Auth',
    components: {
        TagList,
        EditInput,
        Uploader,
        LinkList,
        UpdatePassword,
    },
})
export default class Auth extends Vue {
    @sMod.Action('update') updateSetting
    @aMod.Action('update') updateAuth

    private async personalUpdate (path, val, done) {
        const success = await this.updateSetting({
            personal: {
                [path]: val
            }
        })
        if (success) {
            done && done()
        }
    }

    private async authUpdate (path, val, done?: Function) {
        const success = await this.updateAuth({
            [path]: val
        })
        if (success) {
            done && done()
        }
    }

    private uploadSuccess (avatar) {
        this.authUpdate('avatar', avatar)
    }

    private deleteThumb () {
        this.authUpdate('avatar', DEFAULT_AVATAR)
    }
}