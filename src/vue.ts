/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { cloneDeep, merge, processModel, constant, constantFilter } from '@/utils'
import * as config from '@/config'
import { namespace } from 'vuex-class'

const AppMod = namespace('app')

@Component({
    filters: {
        constantFilter,
    },
})
export default class Base extends Vue {
    public static compile = Vue.compile

    public config = config
    public api = api
    public constant = constant

    public merge = merge
    public cloneDeep = cloneDeep
    public processModel = processModel

    constructor () {
        super()
        // 如果需要在组件template中直接访问Base的方法，需要先在constructor中bind
        // this.exampleMethod = this.exampleMethod.bind(this)
    }
}
