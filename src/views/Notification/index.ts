/**
 * @desc Notification
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:29
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'
import { Container } from '@/components/common'
import { NOTIFICATION_TYPE } from '@/utils/constant'
import { ArticleItem } from '@/views/Article/components'

const nMod = namespace('notification')

@Component({
    name: 'Notification',
    components: {
        Container,
        ArticleItem,
    },
})
export default class Notification extends Vue {
    @nMod.Getter('total') public nTotal
    @nMod.Getter('counts') public nCounts
    @nMod.Action('view') public viewN
    @nMod.Action('viewAll') public viewAllN
    @nMod.Action('delete') public deleteN

    private mode: 'unviewed' | 'viewed' | 'all' = 'all'
    private query: {
        type: string,
        classify?: number,
    } = {
        type: '2',
    }
    private listMap: {
        [key: string]: {
            list: WebApi.NotificationModule.Notification[],
            pageInfo: WebApi.PageInfo,
        },
    } = NOTIFICATION_TYPE.reduce((sum, item) => {
        sum[item.value] = {
            list: [],
            pageInfo: {
                total: 0,
                current: 0,
                pages: 0,
                limit: 0,
            },
        }
        return sum
    }, {})

    private created () {
        if (this.$route.query.hasOwnProperty('viewed')) {
            this.mode = this.$route.query.viewed === 'true' ? 'viewed' : 'unviewed'
        }
        this.getList()
    }

    private async getList (page: number = 1) {
        const params = this.processModel(this.query)
        params.page = page
        if (this.mode === 'viewed') {
            params.viewed = true
        } else if (this.mode === 'unviewed') {
            params.viewed = false
        }
        const res = await this.api.notification.list(params)
        if (res.success) {
            this.listMap[params.type] = {
                list: res.data.list,
                pageInfo: res.data.pageInfo,
            }
        }
    }

    private modeChange (mode) {
        this.mode = mode
        this.$nextTick(() => this.getList(1))
    }

    private typeChange (name) {
        this.$nextTick(() => this.getList(1))
    }

    private pageChange (page) {
        this.getList(page)
    }

    private async viewItem (item, index, type) {
        await this.viewN({
            id: item._id,
            type,
        })
        const l = this.listMap[type.value]
        l.list.splice(index, 1)
        l.pageInfo.total--
    }

    private deleteItem (item, index, type) {
        this.$Modal.confirm({
            title: '提示',
            render: () => {
                const h = this.$createElement
                return h('p', {}, [
                    '确认删除吗？',
                ])
            },
            onOk: async () => {
                await this.deleteN({
                    id: item._id,
                    type,
                })
                const l = this.listMap[type.value]
                l.list.splice(index, 1)
                l.pageInfo.total--
            },
        })
    }

    private renderCount (h, type) {
        return h('span', [
            h('span', type.label),
            h('Badge', {
                props: {
                    count: this.nCounts[type.type],
                    className: 'unviewed-count',
                },
                style: {
                    marginLeft: 8 + 'px',
                    top: -2 + 'px',
                },
            }),
        ])
    }
}
