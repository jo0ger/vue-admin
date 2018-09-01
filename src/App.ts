import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import { namespace } from 'vuex-class'
import layouts, { getLayoutComponentName } from '@/layouts'

const { Getter } = namespace('app')

@Component({
    name: 'App',
    render (h) {
        return h((this as any).layoutComponent, {
            tag: 'component',
        })
    },
    components: {
        ...layouts,
    },
    head: {
        title: '美团旅行助手',
        titleTemplate: '%s-MTA-美团酒店',
    },
})
export default class App extends Vue {
    @Getter public layout!: string

    get layoutComponent () {
        return getLayoutComponentName(this.layout)
    }
}
