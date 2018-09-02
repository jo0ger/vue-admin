<template>
    <component :is="layoutComponent"></component>
</template>

<script lang="ts">
import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'
import layouts, { getLayoutComponentName } from '@/components/layouts'

const { Getter } = namespace('app')

@Component({
    name: 'App',
    components: {
        ...layouts,
    },
    head: {
        title: '后台管理',
        titleTemplate: '%s - 后台管理',
    },
})
export default class App extends Vue {
    @Getter private layout!: string

    get layoutComponent () {
        return getLayoutComponentName(this.layout)
    }
}

</script>


<style lang="stylus" scoped>
@import '~@/assets/style/init'
</style>
