/**
 * @desc Setting
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:56
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'

@Component({
    name: 'Setting',
})
export default class Setting extends Vue {
    private menu = 'keys'

    private menuSelect (menu) {
        this.menu = menu
    }
}