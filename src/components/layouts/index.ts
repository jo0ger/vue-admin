import { capitalize } from '@/utils'
import { DEFAULT_PAGE_LAYOUT } from '@/config'
import LayoutDefault from './Default/index.vue'
import LayoutEmpty from './Empty/index.vue'


const prefix = 'Layout'
// todo node generate
const names = ['default', 'empty']

export default {
    LayoutDefault,
    LayoutEmpty,
}

export const getLayoutComponentName = (layout) => {
    let l = layout
    if (!names.includes(layout)) {
        l = DEFAULT_PAGE_LAYOUT
    }
    return prefix + capitalize(l)
}
