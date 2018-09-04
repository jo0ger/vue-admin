/**
 * @desc Tag
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:58
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component, Watch } from '@/utils/decorators'
import { Container, CTDialog } from '@/components/common'

const { Getter, Action } = namespace('tag')

@Component({
    name: 'Tag',
    components: {
        Container,
        CTDialog,
    },
})
export default class Tag extends Vue {
    @Getter('list') private tList
    @Getter('loading') private tLoading
    @Action('getList') private getTList
    @Action('deleteItem') private deleteTItem

    private query = {
        keyword: '',
    }

    private ctDialogVisible = false
    private curTag = null

    @Watch('ctDialogVisible')
    ctDialogVisibleWatch (val) {
        if (!val) {
            this.curTag = null
        }
    }

    private created () {
        this.search()
    }

    private async search () {
        await this.getTList(this.processModel(this.query))
    }

    private add () {
        this.ctDialogVisible = true
    }
    
    private edit (item) {
        this.ctDialogVisible = true
        this.curTag = item
    }

    private deleteItem (item) {
        this.$Modal.confirm({
            title: '提示',
            render: h => {
                return h('p', null, [
                    '确认删除吗？',
                    h('br'),
                    h('b', `《${item.name}》`),
                ])
            },
            onOk: async () => {
                this.deleteTItem(item._id)
            },
        })
    }
}