import { RootState, Module, Store, ModuleTree } from '@/store'

export const getStoreModule = (mod: Module<any, RootState>): Module<any, RootState> => {
    if (!mod.namespaced) {
        Object.defineProperty(mod, 'namespaced', {
            configurable: false,
            enumerable: true,
            get () {
                return true
            },
        })
    }
    return mod
}

/**
 * store module
 * @param modulePath
 * @param moduleMap
 * @param opt
 * @example
 * const store = asyncStoreModule(['app', 'test'], { module })
 * store.install()
 * store.uninstall()
 */
export const asyncStoreModule = (
    store: Store<any>,
    modulePath: string[],
    moduleMap: ModuleTree<RootState>,
    opt?: object,
) => {
    return {
        path: modulePath,
        install () {
            moduleMap = Object.assign({}, moduleMap)
            const modules: ModuleTree<RootState> = {}
            Object.keys(moduleMap).forEach(key => {
                const mod = moduleMap[key]
                modules[key] = getStoreModule(mod)
            })
            store.registerModule(modulePath, {
                namespaced: true,
                modules,
            }, opt)
        },
        uninstall () {
            store.unregisterModule(modulePath)
        },
    }
}
