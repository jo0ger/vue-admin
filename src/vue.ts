/// <reference path="./typings/api.d.ts" />

/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { cloneDeep, merge, processModel, constant, constantFilter } from '@/utils'
import * as config from '@/config'
import { namespace } from 'vuex-class'

const { Getter } = namespace('auth')

@Component({
    filters: {
        constantFilter,
    },
})
export default class Base extends Vue {
    @Getter('info') protected admin!: WebApi.UserModule.User

    protected static compile = Vue.compile

    protected config = config
    protected api = api
    protected constant = constant

    protected merge = merge
    protected cloneDeep = cloneDeep
    protected processModel = processModel

    constructor () {
        super()
        // 如果需要在组件template中直接访问Base的方法，需要先在constructor中bind
        // this.exampleMethod = this.exampleMethod.bind(this)
    }
}
