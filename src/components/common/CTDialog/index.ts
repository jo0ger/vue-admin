/**
 * @desc CTDialog
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-05 01:00:20
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component, Prop } from '@/utils/decorators'

const cMod = namespace('category')
const tMod = namespace('tag')

const getDefExt = () => ({
    key: '',
    value: '',
})
const getDefMod = () => ({
    name: '',
    description: '',
    extends: [],
})

@Component({
    name: 'CTDialog',
})
export default class CTDialog extends Vue {
    @Prop() private value!: boolean

    @Prop({
        validator (val) {
            return ['category', 'tag'].includes(val)
        },
    })
    private type!: string

    @Prop() private id!: string

    @cMod.Getter('list') private cList
    @cMod.Action('update') private updateCItem
    @cMod.Action('create') private createCItem
    @cMod.Action('getList') private getCList
    @tMod.Getter('list') private tList
    @tMod.Action('update') private updateTItem
    @tMod.Action('create') private createTItem
    @tMod.Action('getList') private getTList

    private model: any = getDefMod()

    private get title () {
        return this.id ? '编辑' : '创建' + {
            category: '分类',
            tag: '标签',
        }[this.type] || ''
    }

    private get visible () {
        if (this.value && this.id) {
            this.getModel()
        }
        return this.value
    }

    private set visible (val) {
        this.$emit('input', val)
        if (!val) {
            setTimeout(() => this.clearModel(), 500)
        }
    }

    private deleteExt (ext, index) {
        this.model.extends.splice(index, 1)
    }

    private addExt () {
        this.model.extends.push(getDefExt())
    }

    private getModel () {
        const hit = this[{
            category: 'cList',
            tag: 'tList',
        }[this.type]].find(item => item._id === this.id)
        if (hit) {
            this.model = hit
        }
    }

    private clearModel () {
        this.model = getDefMod()
    }

    private async submit () {
        const success = await this[{
            category: this.id ? 'updateCItem' : 'createCItem',
            tag: this.id ? 'updateTItem' : 'createTItem',
        }[this.type]](this.id ? {
            id: this.id,
            payload: this.processModel(this.model),
        } : this.processModel(this.model))
        if (success) {
            this.visible = false
            this[{
                category: 'getCList',
                tag: 'getTList',
            }[this.type]]()
        }
    }
}