import Vue from 'vue'
import Vuex, { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'
import { VUEX_DEFAULT_CONFIG } from '@/config'
import { merge } from '@/utils'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store(merge({}, VUEX_DEFAULT_CONFIG, { modules }))

export * from './interface'