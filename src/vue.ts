/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { cloneDeep, merge, processModel, findExtendsItem, constant, filters, moment } from '@/utils'
import * as config from '@/config'
import { namespace } from 'vuex-class'
import { getAliOssClient } from '@/lazyload'
import { ConstantItem } from './utils/constant';

const aMod = namespace('auth')
const sMod = namespace('setting')

@Component({
    filters: {
        ...filters,
    },
})
export default class Base extends Vue {
    @aMod.Getter('info') protected admin!: WebApi.UserModule.User
    @sMod.Getter('data') protected setting!: WebApi.SettingModule.Setting

    protected config = config
    protected api = api
    protected constant = constant

    protected merge = merge
    protected cloneDeep = cloneDeep
    protected processModel = processModel
    protected findExtendsItem = findExtendsItem
    protected moment = moment
    protected formatDate = filters.dateFormat

    constructor () {
        super()
        // 如果需要在组件template中直接访问Base的方法，需要先在constructor中bind
        // this.exampleMethod = this.exampleMethod.bind(this)
        this.getConstantItem = this.getConstantItem.bind(this)
    }

    protected async mountAliossClient () {
        Vue.prototype.$alioss = await getAliOssClient(this.setting.keys.aliyun)
    }

    protected getConstantItem (name: string, value: string | number, findKey: string = 'label') {
        const con: ConstantItem = this.constant[name]
        let find: string | number = ''
        if (con) {
            const hit = con.find(item => item.value === value)
            find = hit && hit[findKey]
        }
        return find || ''
    }
}
