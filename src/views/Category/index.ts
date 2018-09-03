/**
 * @desc Category
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:58
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'
import { Container } from '@/components/common'

const { Getter, Action } = namespace('category')

@Component({
    name: 'Category',
    components: {
        Container,
    },
})
export default class Category extends Vue {
    @Getter('list') private cList
    @Getter('loading') private cLoading
    @Action('getList') private getCList
    @Action('deleteItem') private deleteCItem

    private query = {
        keyword: '',
    }

    private created () {
        this.search()
    }

    private async search () {
        await this.getCList(this.processModel(this.query))
    }

    private add () {}

    private edit () {}

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