/**
 * @desc CTDialog
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-05 01:00:20
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component, Prop, Watch } from '@/utils/decorators'
import Uploader from '../Uploader/index.vue'

const cMod = namespace('category')
const tMod = namespace('tag')

enum type {
    CATEGORY = 'category',
    TAG = 'tag',
}

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
    components: {
        Uploader,
    },
})
export default class CTDialog extends Vue {
    @Prop() private value!: boolean

    @Prop({
        validator (val) {
            return [type.CATEGORY, type.TAG].includes(val)
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

    private get rule () {
        const extValidator = (rule, value, callback) => {
            if (!value.every(({ key, value }) => key && value)) {
                callback(new Error('扩展项信息请填写完整'))
            } else {
                callback()
            }
        }
        return {
            name: [
                { required: true, message: '名称必填' },
            ],
            extends: [
                { validator: extValidator },
            ],
        }
    }

    private visible = false
    private model: any = getDefMod()

    private get title () {
        return this.id ? '编辑' : '创建' + {
            category: '分类',
            tag: '标签',
        }[this.type] || ''
    }

    @Watch('value')
    private watchValue (val, oldVal) {
        if (val !== oldVal) {
            this.visible = val
        }
    }

    @Watch('visible')
    private watchVisible (val, oldVal) {
        if (val === oldVal) return
        this.$emit('input', val)
        if (!val) {
            setTimeout(() => this.clearModel(), 500)
        } else {
            if (this.id) {
                this.getModel()
            } else if (this.type === type.CATEGORY) {
                this.model.extends.push({
                    key: 'image',
                    value: '',
                })
            }
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
            this.model = this.cloneDeep(hit)
        }
    }

    private clearModel () {
        this.model = getDefMod()
    }

    private uploadSuccess (index, url) {
        this.model.extends[index].value = url
    }

    private submit () {
        (this.$refs.form as any).validate(async valid => {
            if (!valid) return
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
        })
    }
}
