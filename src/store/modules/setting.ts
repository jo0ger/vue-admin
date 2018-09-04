/// <reference path="../../typings/api.d.ts" />

import api from '@/api'
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_FAILURE,
    UPDATE_ITEM_SUCCESS
} from '../mutation-types'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'

interface State extends StateTree {
    loading: boolean
    data: WebApi.SettingModule.Setting
}

export const state = (): State => ({
    loading: false,
    data: {} as WebApi.SettingModule.Setting,
})

export const getters: Getters<State, RootState> = {
    loading: s => s.loading,
    data: s => s.data,
}

export const mutations: Mutations<State> = {
    [FETCH_DATA_REQUEST]: s => (s.loading = true),
    [FETCH_DATA_FAILURE]: s => (s.loading = false),
    [FETCH_DATA_SUCCESS]: (s, data) => {
        s.loading = false
        s.data = data
    },
    [UPDATE_ITEM_REQUEST]: s => (s.loading = true),
    [UPDATE_ITEM_FAILURE]: s => (s.loading = false),
    [UPDATE_ITEM_SUCCESS]: (s, data) => {
        s.loading = false
        s.data = data
    },
}

export const actions: Actions<State, RootState> = {
    async getData ({ commit, state }) {
        if (state.loading) return
        commit(FETCH_DATA_REQUEST)
        const { success, data } = await api.setting.getData()
        if (success) {
            commit(FETCH_DATA_SUCCESS, data)
        } else {
            commit(FETCH_DATA_FAILURE)
        }
        return success
    },
    async update ({ commit, state }, payload) {
        if (state.loading || !state.data._id) return
        commit(UPDATE_ITEM_REQUEST)
        const { success, data } = await api.setting.update(state.data._id, payload)
        if (success) {
            commit(UPDATE_ITEM_SUCCESS, data)
        } else {
            commit(UPDATE_ITEM_FAILURE)
        }
        return success
    }
}
