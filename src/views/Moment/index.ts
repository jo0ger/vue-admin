/**
 * @desc Moment
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-11-29 15:47:20
 */

import Vue from '@/vue'
import { Component, Watch } from '@/utils/decorators'
import { Container } from '@/components/common'

@Component({
    name: 'Moment',
    components: {
        Container,
    },
})
export default class Moment extends Vue {
    private query = {
        keyword: '',
    }
    private loading = false
    private list: WebApi.MomentModule.Moment[] = []
    private pageInfo: WebApi.PageInfo = {
        total: 0,
        current: 1,
        pages: 0,
        limit: 10,
    }
    private dialogVisible = false
    private curMoment: any = {}

    private get title () {
        return this.curMoment._id ? '编辑说说' : '创建说说'
    }

    private get rule () {
        return {
            content: [
                { required: true, message: '说说内容必填' },
            ],
        }
    }

    @Watch('dialogVisible')
    private dialogVisibleWatch (val) {
        if (!val) {
            this.curMoment = {}
        }
    }

    private created () {
        this.search()
    }

    private async search (page = 1) {
        if (this.loading) return
        try {
            this.loading = true
            const params: WebApi.MomentModule.list.Req = {
                ...this.query,
                page: (this.pageInfo.current = Number(page) || 1),
                limit: this.pageInfo.limit,
            }
            const res = await this.api.moment.list(this.processModel(params))
            this.loading = false
            this.list = res.data.list
            this.pageInfo = res.data.pageInfo
        } catch (error) {
            this.loading = false
        }
    }

    private pageChange (page) {
        this.search(page)
    }

    private add () {
        this.dialogVisible = true
    }

    private edit (item) {
        this.dialogVisible = true
        this.curMoment = this.cloneDeep(item)
    }

    private deleteItem (item) {
        this.$Modal.confirm({
            title: '提示',
            render: () => {
                const h = this.$createElement
                return h('p', {}, [
                    '确认删除吗？',
                ])
            },
            onOk: async () => {
                const res = await this.api.moment.deleteItem(item._id)
                this.$Message.success(res.message)
                await this.search(this.pageInfo.current)
            },
        })
    }

    private async submit () {
        (this.$refs.form as any).validate(async valid => {
            if (!valid) return
            let res
            if (this.curMoment._id) {
                res = await this.api.moment.update(this.curMoment._id, this.curMoment)
            } else {
                res = await this.api.moment.create(this.curMoment)
            }
            if (res) {
                this.$Message.success(res.message)
                this.dialogVisible = false
                this.search(this.pageInfo.current)
            }
        })
    }

    private get columns () {
        return [
            {
                type: 'index',
                width: 60,
                align: 'center',
            },
            {
                title: '内容',
                key: 'content',
            },
            {
                title: '发表地点',
                key: 'location',
                render: (h, params) => {
                    const { country, area, city } = params.row.location
                    return h('span', null, [
                        country,
                        area,
                        city,
                    ].join('-'))
                },
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
                title: '修改时间',
                key: 'updatedAt',
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
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                            },
                            style: {
                                marginRight: '5px',
                            },
                            on: {
                                click: () => {
                                    this.edit(params.row)
                                },
                            },
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                    this.deleteItem(params.row)
                                },
                            },
                        }, '删除'),
                    ])
                },
            },
        ]
    }
}
