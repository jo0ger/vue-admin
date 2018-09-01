/**
 * @desc 空页面布局
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import template from './index.vue'

@Component({
    name: 'LayoutEmpty',
    mixins: [template],
})
export default class LayoutEmpty extends Vue {
}
