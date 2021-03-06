import api from '@/api'
import { AUTH_CACHE_KEY, AUTH_TOKEN_KEY } from '@/config'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'
import { storage } from '@/utils'
import { Message } from 'iview'

interface State extends StateTree {
    loading: boolean
    info: WebApi.UserModule.User
    token: string
}

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const CLEAR_INFO = 'CLEAR_INFO'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const FETCH_INFO_FAILURE = 'FETCH_INFO_FAILURE'
const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS'
const EDIT_INFO_REQUEST = 'EDIT_INFO_REQUEST'
const EDIT_INFO_FAILURE = 'EDIT_INFO_FAILURE'
const EDIT_INFO_SUCCESS = 'EDIT_INFO_SUCCESS'

const localAuthInfo = (storage.get(AUTH_CACHE_KEY) as WebApi.UserModule.User) || {}

const getDefaultInfo = () => ({ ...localAuthInfo })

export const state = (): State => ({
    loading: false,
    info: getDefaultInfo(),
    token: '',
})

export const getters: Getters<State, RootState> = {
    loading: s => s.loading,
    info: s => s.info,
    token: s => s.token,
    isLogin: s => !!s.token,
}

export const mutations: Mutations<State> = {
    [LOGIN_REQUEST]: s => (s.loading = true),
    [LOGIN_FAILURE]: s => (s.loading = false),
    [LOGIN_SUCCESS]: (s, token) => {
        s.loading = false
        s.token = token
    },
    [CLEAR_INFO]: s => {
        s.info = getDefaultInfo()
        s.token = ''
        s.loading = false
    },
    [LOGOUT_REQUEST]: s => (s.loading = true),
    [LOGOUT_FAILURE]: s => (s.loading = false),
    [LOGOUT_SUCCESS]: s => (s.loading = false),
    [FETCH_INFO_FAILURE]: s => {
        s.token = ''
    },
    [FETCH_INFO_SUCCESS]: (s, { token, info }) => {
        s.info = info
        s.token = token
    },
    [EDIT_INFO_REQUEST]: s => (s.loading = true),
    [EDIT_INFO_FAILURE]: s => (s.loading = false),
    [EDIT_INFO_SUCCESS]: (s, data) => {
        s.loading = false
        s.info = data
    },
}

export const actions: Actions<State, RootState> = {
    async login ({ commit, dispatch, state }, params) {
        if (state.loading) return
        commit(LOGIN_REQUEST)
        const { success, data, message } = await api.auth.login(params)
        if (success) {
            Message.success(message)
            commit(LOGIN_SUCCESS, data.token)
            storage.set(AUTH_TOKEN_KEY, data.token)
            await dispatch('getInfo')
        } else {
            Message.error(message)
            commit(LOGIN_FAILURE)
        }
        return success
    },
    async logout ({ commit, dispatch, state }) {
        if (state.loading) return
        commit(LOGOUT_REQUEST)
        const { success, message } = await api.auth.logout()
        if (success) {
            Message.success(message)
            dispatch('clearAuthInfo')
            commit(LOGOUT_SUCCESS)
        } else {
            Message.error(message)
            commit(LOGOUT_FAILURE)
        }
        return success
    },
    async getInfo ({ commit, state, dispatch }) {
        if (state.loading) return
        try {
            const { success, data } = await api.auth.info()
            if (success) {
                storage.set(AUTH_CACHE_KEY, data)
                commit(FETCH_INFO_SUCCESS, data)
                dispatch('setting/getData', null, { root: true })
                dispatch('notification/getUnviewedCount', null, { root: true })
            } else {
                commit(FETCH_INFO_FAILURE)
            }
            return success
        } catch (error) {
            // pass
        }
        return false
    },
    async update ({ commit, state }, payload) {
        if (state.loading || !state.info._id) return
        commit(EDIT_INFO_REQUEST)
        const { success, data, message } = await api.auth.update(payload)
        if (success) {
            Message.success(message)
            commit(EDIT_INFO_SUCCESS, data)
        } else {
            Message.error(message)
            commit(EDIT_INFO_FAILURE)
        }
        return success
    },
    async updatePassword ({ commit, state }, payload) {
        const { success, data, message } = await api.auth.password(payload)
        if (success) {
            Message.success(message)
        } else {
            Message.error(message)
        }
        return success
    },
    clearAuthInfo ({ commit }) {
        storage.remove(AUTH_CACHE_KEY)
        commit(CLEAR_INFO)
    },
}
