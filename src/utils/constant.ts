/**
 * 一些常量
 */

export type ConstantItem = Array<{
    label: string,
    value: string | number,
}>

export interface Constant {
    [type: string]: ConstantItem
}

export const ARTICLE_STATE = [
    {
        label: '未发布',
        value: 0,
    },
    {
        label: '已发布',
        value: 1,
    },
]

export const ARTICLE_SOURCE = [
    {
        label: '原创',
        value: 0,
    },
    {
        label: '转载',
        value: 1,
    },
]
