import * as app from './app'
import * as auth from './auth'
import * as notification from './notification'
import * as category from './category'
import * as tag from './tag'
import * as setting from './setting'
import { getStoreModule } from '@/utils'

export default {
    app: getStoreModule(app),
    auth: getStoreModule(auth),
    notification: getStoreModule(notification),
    category: getStoreModule(category),
    tag: getStoreModule(tag),
    setting: getStoreModule(setting),
}