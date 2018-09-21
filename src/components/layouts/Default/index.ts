/**
 * @desc Default
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 15:04:29
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { RouteConfig } from 'vue-router'
import { Component } from '@/utils/decorators'
import routes from '@/router/routes'

const aMod = namespace('auth')
const nMod = namespace('notification')
const sMod = namespace('setting')

@Component({
    name: 'Default',
    head () {
        const head: any = {}
        if (this.$route.meta.title) {
            head.title = this.$route.meta.title
        }
        return head
    },
})
export default class Default extends Vue {
    @aMod.Action
    private logout

    @nMod.Getter('total')
    private nTotal

    @nMod.Action('getUnviewedCount')
    private getNUnviewedCount

    @sMod.Action('getData')
    private getSData

    get routeMenus () {
        return this.genMenu(routes)
    }

    private created () {
        this.getSData()
        this.getNUnviewedCount()
    }

    private genMenu (r: RouteConfig[]) {
        return this.cloneDeep(r).reduce((sum: RouteConfig[], route) => {
            if (route.meta && route.meta.menu) {
                if (route.children && route.children.length) {
                    route.children = this.genMenu(route.children)
                }
                sum.push(route)
            }
            return sum
        }, [])
    }

    private menuClick (name: string) {
        this.$router.push({ name })
    }

    private handleLogout () {
        this.$Modal.confirm({
            title: '提示',
            content: '确认退出吗？',
            onOk: () => {
                this.logout().then(success => {
                    if (success) {
                        this.$router.push({ name: 'Login' })
                    }
                })
            },
        })
    }
}
