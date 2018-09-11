/**
 * @desc Setting
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:56
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { LinkList, SiteSetting, LimitSetting, KeysSetting } from './components'

@Component({
    name: 'Setting',
    components: {
        LinkList,
        SiteSetting,
        LimitSetting,
        KeysSetting,
    },
})
export default class Setting extends Vue {
    private menu = 'site'

    private created () {
        const tab = this.$route.query.tab
        if (tab) {
            this.menu = tab
        }
    }

    private menuSelect (menu) {
        this.menu = menu
        this.$router.replace({
            query: {
                tab: menu,
            },
        })
    }
}