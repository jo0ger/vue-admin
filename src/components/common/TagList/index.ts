/**
 * @desc TagList
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 15:11:57
 */

import Vue from '@/vue'
import { Component, Prop, Watch } from '@/utils/decorators'

@Component({
    name: 'TagList',
})
export default class TagList extends Vue {
    @Prop()
    private value!: string[]

    @Prop({ default: '添加标签' })
    private actionText!: string

    @Prop({ default: true })
    private canEdit!: boolean

    private adding: boolean = false
    private input: string = ''

    private val: string[] = []

    @Watch('value', {
        immediate: true
    })
    private watchValue (val, oldVal) {
        if (oldVal !== val) {
            this.val = val
        }
    }

    private addTag () {
        if (this.input) {
            this.val.push(this.input)
            this.$emit('on-change', this.val, () => this.toogleTagAdd())
        } else {
            this.toogleTagAdd()
        }
    }

    private deleteTag (index) {
        this.val.splice(index, 1)
        this.$emit('on-change', this.val)
    }

    private toogleTagAdd () {
        this.adding = !this.adding
        this.input = ''
    }
}