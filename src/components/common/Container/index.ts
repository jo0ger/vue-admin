/**
 * @desc Container
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 01:14:02
 */

import Vue from '@/vue'
import { Component, Prop } from '@/utils/decorators'

@Component({
    name: 'Container',
})
export default class Container extends Vue {
    @Prop()
    private logo!: string

    @Prop()
    private title!: string

    @Prop()
    private desc!: string

    get hasTitleSlots () {
        return this.getNamedSlotsExist('title')
    }

    get hasLogoSlots () {
        return this.getNamedSlotsExist('logo')
    }

    get hasActionSlots () {
        return this.getNamedSlotsExist('action')
    }

    get hasDescSlots () {
        return this.getNamedSlotsExist('desc')
    }

    get hasFilterSlots () {
        return this.getNamedSlotsExist('filter')
    }

    private getNamedSlotsExist (name) {
        const slots = this.$slots[name]
        return Boolean(slots && slots.length)
    }
}