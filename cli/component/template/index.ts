/**
 * @desc ${componentName}
 * @author ${author}
 * @date ${date}
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'
import template from './index.vue'

@Component({
    name: '${componentName}',
    mixins: [template]
})
export default class ${componentName} extends Vue {
}