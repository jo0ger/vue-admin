/**
 * @desc KeysSetting
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-11 23:35:23
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'

const { Action } = namespace('setting')

@Component({
    name: 'KeysSetting',
})
export default class KeysSetting extends Vue {
    @Action('update') public updateSetting

    private type: '' | 'aliyun' | 'alinode' | 'aliApiGateway' | 'mail' = ''

    private model: WebApi.SettingModule.Setting['keys'] = {
        aliyun: {
            accessKeyId: '',
            accessKeySecret: '',
            bucket: '',
            region: '',
        },
        alinode: {
            appid: '',
            secret: '',
        },
        aliApiGateway: {
            ip: {
                appCode: '',
            },
        },
        mail: {
            user: '',
            pass: '',
        },
    }

    private map = [
        {
            name: '阿里云OSS',
            desc: '阿里云OSS的相关配置参数',
            type: 'aliyun',
        },
        {
            name: '阿里Node性能平台',
            desc: '阿里Node性能平台的相关配置参数',
            type: 'alinode',
        },
        {
            name: '阿里Api网关',
            desc: '阿里Api网关的相关配置参数',
            type: 'aliApiGateway',
        },
        {
            name: '163邮箱',
            desc: '163邮箱的账号密码',
            type: 'mail',
        },
    ]

    private visible: boolean = false

    private get cur () {
        const hit = this.map.find(item => item.type === this.type)
        return hit || null
    }

    private open (type) {
        this.type = type
        this.model[this.type] = this.setting.keys[this.type]
        this.visible = true
    }

    private close () {
        if (!this.type) return
        this.model[this.type] = this.setting.keys[this.type]
        this.type = ''
        this.visible = false
    }

    private async submit () {
        const success = await this.updateSetting({
            keys: {
                [this.type]: this.model[this.type],
            },
        })
        if (success) {
            this.close()
        }
    }
}