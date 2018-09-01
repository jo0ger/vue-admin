/**
 * @desc 默认布局
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import template from './index.vue'

@Component({
    name: 'LayoutDefault',
    mixins: [template],
    components: {
    },
})
export default class LayoutDefault extends Vue {
}
