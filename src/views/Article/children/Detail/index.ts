/**
 * @desc Detail
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 15:24:15
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'
import { MDEditor  } from "@/components/common"

const cMod = namespace('category')
const tMod = namespace('tag')

@Component({
    name: 'Detail',
    components: {
        MDEditor,
    },
})
export default class Detail extends Vue {
    @cMod.Getter('list') private cList
    @cMod.Action('getList') private getCList
    @tMod.Getter('list') private tList
    @tMod.Action('getList') private getTList

    private model: WebApi.ArticleModule.Article = {
        title: '',
        description: '',
        state: 0,
        source: 0,
        keywords: [],
        thumb: '',
        category: '',
        tag: [],
        createdAt: new Date(),
    }

    private keyword = {
        adding: false,
        input: '',
    }

    private created () {
        this.getCList()
        this.getTList()
    }

    private toggleKeywordAdd () {
        this.keyword.adding = !this.keyword.adding
        this.keyword.input = ''
    }

    private addKeyword () {
        if (this.keyword.input) {
            (this.model.keywords as string[]).push(this.keyword.input)
        }
        this.toggleKeywordAdd()
    }

    private deleteKeyword (index) {
        (this.model.keywords as string[]).splice(index, 1)
    }

    private async submit () {}
}