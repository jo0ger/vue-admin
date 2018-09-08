/**
 * @desc EditInput
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 15:31:57
 */

import Vue from '@/vue'
import { Component, Prop, Watch } from '@/utils/decorators'

@Component({
    name: 'EditInput',
})
export default class EditInput extends Vue {
    @Prop({ default: '' })
    private value!: string

    private editMode: boolean = false
    private val: string = ''

    @Watch('value', {
        immediate: true
    })
    private watchValue (val, oldVal) {
        if (oldVal !== val) {
            this.val = val
        }
    }

    private sumit () {
        this.$emit('on-submit', this.val, () => {
            this.editMode = false
        })
    }

    private cancel () {
        this.editMode = false
        this.val = this.value
    }
}