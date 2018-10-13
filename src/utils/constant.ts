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
        code: 'original'
    },
    {
        label: '转载',
        value: 1,
        code: 'reprint'
    },
    {
        label: '混撰',
        value: 2,
        code: 'hybrid'
    },
    {
        label: '翻译',
        value: 3,
        code: 'translate'
    },
]

export const NOTIFICATION_TYPE: ConstantItem = [
    {
        label: '点赞通知',
        value: '2',
        type: 'like',
        icon: 'md-thumbs-up',
    },
    {
        label: '评论通知',
        value: '1',
        type: 'comment',
        icon: 'md-text',
    },
    {
        label: '用户通知',
        value: '3',
        type: 'user',
        icon: 'md-people',
    },
    {
        label: '系统通知',
        value: '0',
        type: 'general',
        icon: 'md-cog',
    },
]

export const GENERAL_NOTIFICATION_CLASSIFY: ConstantItem = [
    {
        label: '邮件客户端校验失败',
        value: 'mail_verify_fail',
    },
    {
        label: '邮件发送失败',
        value: 'mail_send_fail',
    },
    {
        label: 'Akismet校验失败',
        value: 'akismet_check_fail',
    },
]
