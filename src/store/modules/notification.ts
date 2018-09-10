/// <reference path="../../typings/api.d.ts" />

import api from '@/api'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'
import { NOTIFICATION_TYPE } from '@/utils/constant'
import { DELETE_ITEM_REQUEST, DELETE_ITEM_FAILURE, DELETE_ITEM_SUCCESS } from '../mutation-types'
import { Message } from 'iview'

const FETCH_COUNT_REQUEST = 'FETCH_COUNT_REQUEST'
const FETCH_COUNT_SUCCESS = 'FETCH_COUNT_SUCCESS'
const FETCH_COUNT_FAILURE = 'FETCH_COUNT_FAILURE'
const VIEW_ITEM = 'VIEW_ITEM'
const VIEW_ALL = 'VIEW_ALL'

interface State extends StateTree {
    loading: boolean
    total: number,
    counts: {
        general: number,
        comment: number,
        like: number,
        user: number,
    }
}

export const state = (): State => ({
    loading: false,
    total: 0,
    counts: {
        general: 0,
        comment: 0,
        like: 0,
        user: 0,
    },
})

export const getters: Getters<State, RootState> = {
    loading: s => s.loading,
    total: s => s.total,
    counts: s => s.counts,
}

export const mutations: Mutations<State> = {
    [FETCH_COUNT_REQUEST]: s => (s.loading = true),
    [FETCH_COUNT_FAILURE]: s => (s.loading = false),
    [FETCH_COUNT_SUCCESS]: (s, { counts, total }) => {
        s.loading = false
        s.total = total
        s.counts = counts
    },
    [VIEW_ITEM]: (s, type) => {
        const hit = NOTIFICATION_TYPE.find(item => item.value == type.value)
        if (hit) {
            const key = hit.type
            s.total--
            s.counts[key]--
        }
    },
    [VIEW_ALL]: s => {
        s.total = 0
        Object.keys(s.counts).forEach(key => {
            s.counts[key] = 0
        })
    },
}

export const actions: Actions<State, RootState> = {
    async getUnviewedCount ({ commit, state }) {
        if (state.loading) return
        commit(FETCH_COUNT_REQUEST)
        const { success, data } = await api.notification.getUnviewedCount()
        if (success) {
            commit(FETCH_COUNT_SUCCESS, data)
        } else {
            commit(FETCH_COUNT_FAILURE)
        }
        return success
    },
    async view ({ commit, state }, { id, type }) {
        const { success, message } = await api.notification.view(id)
        if (success) {
            Message.success(message)
            commit(VIEW_ITEM, type)
        } else {
            Message.error(message)
        }
        return success
    },
    async viewAll ({ commit, state }) {
        const { success, message } = await api.notification.viewAll()
        if (success) {
            Message.success(message)
            commit(VIEW_ALL)
        } else {
            Message.error(message)
        }
        return success
    },
    async delete ({ commit, state }, { id, type, index }) {
        const { success, message } = await api.notification.deleteItem(id)
        if (success) {
            Message.success(message)
            commit(VIEW_ITEM, type)
        } else {
            Message.error(message)
        }
        return success
    },
}
