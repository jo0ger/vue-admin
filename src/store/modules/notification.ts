/// <reference path="../../typings/api.d.ts" />

import api from '@/api'
import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE} from '../mutation-types'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'

interface State extends StateTree {
    loading: boolean
    list: WebApi.NotificationModule.Notification[]
    pageInfo: WebApi.PageInfo
}

export const state = (): State => ({
    loading: false,
    list: [],
    pageInfo: {
        total: 0,
        current: 0,
        pages: 0,
        limit: 0,
    },
})

export const getters: Getters<State, RootState> = {
    loading: s => s.loading,
    list: s => s.list,
    pageInfo: s => s.pageInfo,
}

export const mutations: Mutations<State> = {
    [FETCH_LIST_REQUEST]: s => (s.loading = true),
    [FETCH_LIST_FAILURE]: s => (s.loading = false),
    [FETCH_LIST_SUCCESS]: (s, { list, pageInfo }) => {
        s.loading = false
        s.list = list
        s.pageInfo = pageInfo
    },
}

export const actions: Actions<State, RootState> = {
    async getList ({ commit, state }, params) {
        if (state.loading) return
        commit(FETCH_LIST_REQUEST)
        const { success, data } = await api.notification.list(params)
        if (success) {
            commit(FETCH_LIST_SUCCESS, data)
        } else {
            commit(FETCH_LIST_FAILURE)
        }
        return success
    },
}
