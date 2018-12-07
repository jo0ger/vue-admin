/**
 * @desc Comment
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:35
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { Container, Editor } from '@/components/common'
import { getDefPageInfo } from '@/utils'
import { COMMENT_TYPE } from '@/utils/constant'
@Component({
    name: 'Comment',
    components: {
        Container,
        Editor,
    },
})
export default class Comment extends Vue {
    private curTab = 'comment'
    private data = COMMENT_TYPE.reduce((sum, item) => {
        sum[item.type] = {
            title: item.label,
            query: {
                type: item.value,
            },
            loading: false,
            list: [],
            pageInfo: getDefPageInfo(),
        }
        return sum
    }, {} as {
        [key: string]: {
            title: string
            query: {
                [key: string]: any,
            }
            loading: boolean
            list: WebApi.CommentModule.Comment[]
            pageInfo: WebApi.PageInfo,
        },
    })
    private dialogVisible = false
    private replyTarget: any = null
    private replyContent = ''
    private replyLoading = false
    private updateDialogVisible = false
    private updateTarget: any = null
    private updateLoading = false

    private get current () {
        return this.data[this.curTab]
    }

    private created () {
        this.getList()
    }

    private async getList (page: number = 1) {
        const { loading, query } = this.data[this.curTab]
        if (loading) return
        const cur = this.curTab
        this.data[cur].loading = true
        const res = await this.api.comment.list({
            ...query,
            page,
        })
        this.data[cur].loading = false
        if (res.success) {
            this.data[cur] = {
                ...this.data[cur],
                ...res.data,
            }
        }
    }

    private async update (id: string, payload: any) {
        if (this.updateLoading) return
        this.updateLoading = true
        const res = await this.api.comment.update(id, payload)
        this.updateLoading = false
        if (res.success) {
            this.$Message.success(res.message)
        }
        return res.success
    }

    private tabChange () {
        this.$nextTick(() => this.getList(1))
    }

    private pageChange (page) {
        this.getList(page)
    }

    private updateState (index, item) {
        this.updateTarget = this.cloneDeep(item)
        this.updateDialogVisible = true
    }

    private async updateStateSubmit () {
        const success = await this.update(this.updateTarget._id, {
            state: this.updateTarget.state,
        })
        if (success) {
            this.close()
            this.getList(this.current.pageInfo.current)
        }
    }

    private reply (index, item) {
        this.dialogVisible = true
        this.replyTarget = item
    }

    private getPayload () {
        const payload: any = {
            content: this.replyContent,
            author: this.admin._id,
            type: this.replyTarget.type,
        }
        if (this.replyTarget.article) {
            payload.article = this.replyTarget.article._id
        }
        if (this.replyTarget.parent) {
            payload.parent = this.replyTarget.parent._id
        }
        if (this.replyTarget.forward) {
            payload.forward = this.replyTarget.forward._id
        }
        return payload as WebApi.CommentModule.Comment
    }

    private async replySubmit () {
        const res = await this.api.comment.create(this.getPayload())
        if (res.success) {
            this.$Message.success(res.message)
            this.close()
            this.getList()
        }
    }

    private close () {
        this.dialogVisible = false
        this.updateDialogVisible = false
        this.replyTarget = null
        this.replyContent = ''
        this.updateTarget = null
    }

    private get columns () {
        const columns = [
            {
                type: 'index',
                width: 60,
                align: 'center',
            },
            {
                title: '内容',
                key: 'content',
                width: 250,
                render: (h, params) => {
                    return h('p', {
                        style: {
                            'padding': '16px 0',
                            'display': '-webkit-box',
                            'overflow': 'hidden',
                            '-webkit-line-clamp': '3',
                            '-webkit-box-orient': 'vertical',
                        },
                    }, params.row.content)
                },
            },
            {
                title: '发布人',
                key: 'author',
                width: 200,
                render: (h, params) => {
                    const itemMargin = '8px 0'
                    return h('div', {
                        style: {
                            padding: '16px',
                        },
                    }, [
                        h('p', {
                            style: {
                                margin: itemMargin,
                                fontWeight: 'bold',
                            },
                        }, [
                            h('Avatar', {
                                props: {
                                    size: 'small',
                                    src: params.row.author.avatar,
                                },
                                style: {
                                    marginRight: '8px',
                                },
                            }),
                            params.row.author.name,
                        ]),
                        h('p', {
                            style: {
                                margin: itemMargin,
                            },
                        }, params.row.author.email),
                        params.row.author.site && h('p', {
                            style: {
                                margin: itemMargin,
                            },
                        }, params.row.author.site),
                    ])
                },
            },
            {
                title: '状态',
                key: 'state',
                width: 120,
                render: (h, params) => {
                    const find = this.getConstantItem('COMMENT_STATE', params.row.state)
                    return h('Tag', {
                        props: {
                            type: 'border',
                            color: find.color,
                        },
                    }, find.label)
                },
            },
            {
                title: '点赞数',
                key: 'ups',
                width: 80,
            },
            {
                title: '发表时间',
                key: 'createdAt',
                render: (h, params) => {
                    return h('Time', {
                        props: {
                            time: params.row.createdAt,
                            type: 'datetime',
                        },
                    })
                },
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    const renderBtn = (text, type, handler) => {
                        return h('Button', {
                            props: {
                                type: type || 'default',
                                size: 'small',
                            },
                            style: {
                                marginRight: '5px',
                            },
                            on: {
                                click: () => {
                                    handler(params.index, params.row)
                                },
                            },
                        }, text)
                    }
                    return h('div', [
                        renderBtn('修改', 'default', this.updateState),
                        renderBtn('回复', 'primary', this.reply),
                    ])
                },
            },
        ]
        if (this.curTab === 'comment') {
            columns.splice(-1, 0, {
                title: '所属文章',
                key: 'article',
                render: (h, params) => {
                    return h('router-link', {
                        props: {
                            to: `/articles/${params.row.article._id}`,
                        },
                    }, params.row.article.title)
                },
            })
        }
        return columns
    }
}
