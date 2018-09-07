/// <reference path="../../typings/api.d.ts" />

import api from '@/api'
import {
    FETCH_LIST_REQUEST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE,
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILURE,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
} from '../mutation-types'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'
import { Message } from 'iview'

interface State extends StateTree {
    loading: boolean
    list: WebApi.CategoryModule.Category[]
}

export const state = (): State => ({
    loading: false,
    list: [],
})

export const getters: Getters<State, RootState> = {
    loading: s => s.loading,
    list: s => s.list,
    listWidthAll: s => {
        return [
            {
                _id: '',
                name: '全部',
            },
            ...s.list,
        ]
    },
}

export const mutations: Mutations<State> = {
    [FETCH_LIST_REQUEST]: s => (s.loading = true),
    [FETCH_LIST_FAILURE]: s => (s.loading = false),
    [FETCH_LIST_SUCCESS]: (s, list) => {
        s.loading = false
        s.list = list
    },
    [CREATE_ITEM_REQUEST]: s => (s.loading = true),
    [CREATE_ITEM_FAILURE]: s => (s.loading = false),
    [CREATE_ITEM_SUCCESS]: s => (s.loading = false),
    [UPDATE_ITEM_REQUEST]: s => (s.loading = true),
    [UPDATE_ITEM_FAILURE]: s => (s.loading = false),
    [UPDATE_ITEM_SUCCESS]: (s, data) => {
        s.loading = false
        const index = s.list.findIndex(item => item._id === data._id)
        if (index > -1) {
            s.list.splice(index, 1, data)
        }
    },
    [DELETE_ITEM_REQUEST]: s => (s.loading = true),
    [DELETE_ITEM_FAILURE]: s => (s.loading = false),
    [DELETE_ITEM_SUCCESS]: s => (s.loading = false),
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
    },
    async create ({ commit, state }, payload) {
        if (state.loading) return
        commit(CREATE_ITEM_REQUEST)
        const { success, message } = await api.category.create(payload)
        if (success) {
            commit(CREATE_ITEM_SUCCESS)
            Message.success(message)
        } else {
            commit(CREATE_ITEM_FAILURE)
            Message.error(message)
        }
        return success
    },
    async update ({ commit, state }, { id, payload }) {
        if (state.loading) return
        commit(UPDATE_ITEM_REQUEST)
        const { success, data, message } = await api.category.update(id, payload)
        if (success) {
            commit(UPDATE_ITEM_SUCCESS, data)
            Message.success(message)
        } else {
            commit(UPDATE_ITEM_FAILURE)
            Message.error(message)
        }
        return success
    },
    async deleteItem ({ commit, state }, id) {
        if (state.loading) return
        commit(DELETE_ITEM_REQUEST)
        const { success, message } = await api.category.deleteItem(id)
        if (success) {
            commit(DELETE_ITEM_SUCCESS)
            Message.success(message)
        } else {
            commit(DELETE_ITEM_FAILURE)
            Message.error(message)
        }
        return success
    },
}
