import * as app from './app'
import { getStoreModule } from '@/utils'

export default {
    app: getStoreModule(app),
}