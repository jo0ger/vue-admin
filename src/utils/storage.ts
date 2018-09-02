/**
 * storage
 */

const storage = window.localStorage
const error = (e: Error | string) => {
    console.error(e)
}

export default {
    get (key: string): object | null {
        try {
            return JSON.parse(storage.getItem(key) as string)
        } catch (e) {
            error(e)
            return null
        }
    },
    set (key: string, val: any) {
        try {
            storage.setItem(key, JSON.stringify(val))
        } catch (e) {
            error(e)
        }
    },
    remove (key: string) {
        try {
            storage.removeItem(key)
        } catch (e) {
            error(e)
        }
    },
    clear () {
        try {
            storage.clear()
        } catch (e) {
            error(e)
        }
    },
}
