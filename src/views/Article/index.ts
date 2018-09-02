/**
 * @desc Article
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:43
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { Container } from '@/components/common'
import { namespace } from 'vuex-class'

const cMod = namespace('category')
const tMod = namespace('tag')

@Component({
    name: 'Article',
    components: {
        Container,
    },
})
export default class Article extends Vue {
    @cMod.Getter('list') private cList
    @cMod.Action('getList') private getCList
    @tMod.Getter('list') private tList
    @tMod.Action('getList') private getTList

    query = {
        keyword: ''
    }

    filter = {
        category: '',
        tag: '',
        state: '',
        source: '',
        startDate: '',
        endDate: ''
    }

    created () {
        this.getCList()
        this.getTList()
    }
}