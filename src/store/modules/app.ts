import api from '@/api'
import { DEFAULT_PAGE_LAYOUT } from '@/config'
import { StateTree, Getters, RootState, Mutations, Actions } from '../interface'

interface State extends StateTree {
    layout: string
}

const APPLY_LAYOUT = 'APPLY_LAYOUT'

export const state = (): State => ({
    layout: DEFAULT_PAGE_LAYOUT,
})

export const getters: Getters<State, RootState> = {
    layout: s => s.layout,
}

export const mutations: Mutations<State> = {
    [APPLY_LAYOUT]: (s, layout = DEFAULT_PAGE_LAYOUT): void => (s.layout = layout),
}

export const actions: Actions<State, RootState> = {}
