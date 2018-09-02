/// <reference path="../../typings/api.d.ts" />

import api from '@/api'
import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE} from '../mutation-types'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'

interface State extends StateTree {
    loading: boolean
    list: WebApi.NotificationModule.Notification[]
}

export const state = (): State => ({
    loading: false,
    list: [],
})

export const getters: Getters<State, RootState> = {
    loading: s => s.loading,
    list: s => s.list,
}

export const mutations: Mutations<State> = {
    [FETCH_LIST_REQUEST]: s => (s.loading = true),
    [FETCH_LIST_FAILURE]: s => (s.loading = false),
    [FETCH_LIST_SUCCESS]: (s, list) => {
        s.loading = false
        s.list = list
    },
}

export const actions: Actions<State, RootState> = {
    async getList ({ commit, state }, params) {
        if (state.loading) return
        commit(FETCH_LIST_REQUEST)
        const { success, data } = await api.category.list(params)
        if (success) {
            commit(FETCH_LIST_SUCCESS, data)
        } else {
            commit(FETCH_LIST_FAILURE)
        }
        return success
    }
}
