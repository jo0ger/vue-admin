/**
 * @desc Category
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:58
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component, Watch } from '@/utils/decorators'
import { Container, CTDialog } from '@/components/common'

const { Getter, Action } = namespace('category')

@Component({
    name: 'Category',
    components: {
        Container,
        CTDialog,
    },
})
export default class Category extends Vue {
    @Getter('list') private cList
    @Getter('loading') private cLoading
    @Action('getList') private getCList
    @Action('deleteItem') private deleteCItem

    private colResponsiveProps = {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 6
    }

    private query = {
        keyword: '',
    }

    private ctDialogVisible = false
    private curCategory = null

    @Watch('ctDialogVisible')
    private ctDialogVisibleWatch (val) {
        if (!val) {
            this.curCategory = null
        }
    }

    private created () {
        this.search()
    }

    private async search () {
        await this.getCList(this.processModel(this.query))
    }

    private add () {
        this.ctDialogVisible = true
    }
    
    private edit (item) {
        this.ctDialogVisible = true
        this.curCategory = item
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
                this.deleteCItem(item._id)
            },
        })
    }
}