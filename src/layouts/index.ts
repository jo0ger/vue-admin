import { capitalize } from '@/utils'
import { DEFAULT_PAGE_LAYOUT } from '@/config'

const prefix = 'Layout'
const names = ['default', 'empty']

export default Object.values(names).reduce((s, l) => {
    s[prefix + capitalize(l)] = () => import(`./${l}`)
    return s
}, {})

export const getLayoutComponentName = (layout: string) => {
    let l = layout
    if (!names.includes(layout)) {
        l = DEFAULT_PAGE_LAYOUT
    }
    return prefix + capitalize(l)
}
