import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        layout?: string
        head?: MetaInfo
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $Modal: any
        $Notice: any
        $Message: any
    }
    interface VueConstructor<V extends Vue> {}
}
