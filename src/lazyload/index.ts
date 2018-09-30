export const getAliOssClient = async (opt?: any) => {
    const module = await import(/* webpackChunkName: 'ali-oss' */ '@/lazyload/alioss')
    const AliOSS = module.default || module
    return new AliOSS(opt)
}

export const getG2 = async () => {
    const module = await import(/* webpackChunkName: 'g2' */ '@/lazyload/g2')
    return module.default || module
}

export const getHighlight = async () => {
    const module = await import(/* webpackChunkName: 'ali-oss' */ '@/lazyload/highlight')
    return module.default || module
}
