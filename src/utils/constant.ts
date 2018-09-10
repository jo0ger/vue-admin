/**
 * 一些常量
 */

export type ConstantItem = Array<{
    [key: string]: any,
    label: string,
    value: string | number,
}>

export interface Constant {
    [type: string]: ConstantItem
}

export const ARTICLE_STATE: ConstantItem = [
    {
        label: '未发布',
        value: 0,
    },
    {
        label: '已发布',
        value: 1,
    },
]

export const ARTICLE_SOURCE: ConstantItem = [
    {
        label: '原创',
        value: 0,
    },
    {
        label: '转载',
        value: 1,
    },
]

export const NOTIFICATION_TYPE: ConstantItem = [
    {
        label: '点赞通知',
        value: '2',
        type: 'like',
    },
    {
        label: '评论通知',
        value: '1',
        type: 'comment',
    },
    {
        label: '用户通知',
        value: '3',
        type: 'user',
    },
    {
        label: '系统通知',
        value: '0',
        type: 'general',
    },
]
