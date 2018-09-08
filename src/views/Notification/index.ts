/**
 * @desc Notification
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:29
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { Container } from '@/components/common'

@Component({
    name: 'Notification',
    components: {
        Container,
    },
})
export default class Notification extends Vue {
}