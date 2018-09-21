/**
 * @desc ArticleItem
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-07 21:30:08
 */

import Vue from '@/vue'
import { Component, Prop } from '@/utils/decorators'

@Component({
    name: 'ArticleItem',
})
export default class ArticleItem extends Vue {
    @Prop({ required: true })
    private article!: object

    @Prop({ required: true })
    private index!: number

    @Prop({ default: false })
    private tip!: boolean

    private deleteArticle (article) {
        this.$Modal.confirm({
            title: '提示',
            render: () => {
                const h = this.$createElement
                return h('p', {}, [
                    '确认删除吗？',
                    h('br'),
                    h('b', `《${article.title}》`),
                ])
            },
            onOk: () => {
                this.$emit('on-delete', article, this.index)
            },
        })
    }

    private changeState (article) {
        this.$emit('on-change-state', article, 1 - article.state)
    }
}
