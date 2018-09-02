/**
 * @desc Dashboard
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-01 21:53:55
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { Container } from '@/components/common'

@Component({
    name: 'Dashboard',
    components: {
        Container ,
    },
})
export default class Dashboard extends Vue {
}