/**
 * @desc Article
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:43
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { ArticleItem } from './components'
import { namespace } from 'vuex-class'

const cMod = namespace('category')
const tMod = namespace('tag')

@Component({
    name: 'Article',
    components: {
        ArticleItem,
    },
})
export default class Article extends Vue {
    @cMod.Getter('listWidthAll') private cList
    @cMod.Action('getList') private getCList
    @tMod.Getter('listWidthAll') private tList
    @tMod.Action('getList') private getTList

    private aLoading: boolean = false

    private aList: WebApi.ArticleModule.Article[] = []

    private pageInfo: WebApi.PageInfo = {
        total: 0,
        current: 1,
        pages: 0,
        limit: 20,
    }

    private query = {
        keyword: '',
    }

    private filter = {
        category: '',
        tag: '',
        state: '',
        source: '',
        startDate: '',
        endDate: '',
    }

    private pageReq: WebApi.IPageableRequest = {
        page: 1,
    }

    private created () {
        this.getCList()
        this.getTList()
        this.search()
    }

    private async search (payload: any = {}) {
        if (this.aLoading) return
        payload = Object.assign({}, payload, this.pageReq)
        this.aLoading = true
        const res = await this.api.article.list(
            this.processModel(payload),
        )
        this.aLoading = false
        if (payload.page > this.pageInfo.current) {
            // loadmore
            this.aList.push(...res.data.list)
        } else {
            this.aList = res.data.list
        }
        this.pageInfo = res.data.pageInfo
    }

    private keywordSearch () {
        this.pageReq.page = 1
        this.search(this.query)
    }

    private filterSearch () {
        this.pageReq.page = 1
        this.search({
            ...this.query,
            ...this.filter,
        })
    }

    private loadmore () {
        this.pageReq.page++
        this.search({
            ...this.query,
            ...this.filter,
        })
    }

    private async deleteArticle (article, index) {
        const res = await this.api.article.deleteItem(article._id)
        this.$Message.success(res.message)
        this.aList.splice(index, 1)
        this.pageInfo.total--
    }

    private async changeState (article, state) {
        const res = await this.api.article.update(article._id, { state })
        this.$Message.success(res.message)
        article.state = state
    }
}