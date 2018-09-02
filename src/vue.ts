/// <reference path="./typings/api.d.ts" />

/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { cloneDeep, merge, processModel, findExtendsItem, constant, filters } from '@/utils'
import * as config from '@/config'
import { namespace } from 'vuex-class'

const { Getter } = namespace('auth')

@Component({
    filters: {
        ...filters,
    },
})
export default class Base extends Vue {
    @Getter('info') protected admin!: WebApi.UserModule.User

    protected config = config
    protected api = api
    protected constant = constant

    protected merge = merge
    protected cloneDeep = cloneDeep
    protected processModel = processModel
    protected findExtendsItem = findExtendsItem

    constructor () {
        super()
        // 如果需要在组件template中直接访问Base的方法，需要先在constructor中bind
        // this.exampleMethod = this.exampleMethod.bind(this)
    }
}
