import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Message, ModalInstance, LoadingBar } from 'iview'
import AliOSS from '@/lazyload/alioss'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        layout?: string
        head?: MetaInfo | (() => MetaInfo)
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $Modal: ModalInstance
        $Message: Message
        $meta: any
        $alioss: AliOSS
    }
    interface VueConstructor<V extends Vue> {}
}
declare module 'iview/dist/types/message' {
    export const Message: Message
}

declare module 'iview/dist/types/loading-bar' {
    export const LoadingBar: LoadingBar
}
