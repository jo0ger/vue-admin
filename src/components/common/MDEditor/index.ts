/**
 * @desc MDEditor
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-07 23:41:38
 */

import Vue from '@/vue'
import { Component, Prop, Watch } from '@/utils/decorators'
import commands from './lib/commands'
import { getSelection, setSelection } from './lib/selectionHelper'
import { markdown, noop } from '@/utils'
import { debounce } from 'lodash'

@Component({
    name: 'MDEditor',
})
export default class MDEditor extends Vue {
    public static commands = commands

    @Prop({ default: 650 })
    private height!: number

    @Prop({ required: true })
    private value!: string

    @Prop({
        default () {
            return commands.getDefaultCommands()
        },
    })
    private commands!: any[]

    @Prop({ default: false })
    private mini!: boolean

    private mode = {
        fullscreen: false,
        preview: false,
    }

    private val = ''
    private previewContent = ''
    private setPreviewContent: () => void = noop

    private get classes () {
        return {
            'mini-mode': this.mini,
            'fullscreen-mode': this.mode.fullscreen,
            'preview-mode': this.mode.preview,
        }
    }

    private get contentStyle () {
        return {
            height: this.height + 'px',
        }
    }

    @Watch('value')
    private watchValue () {
        this.setPreviewContent()
    }

    private created () {
        this.setPreviewContent = this.getPreviewContentDebounceFn()
    }

    private beforeDestroy () {
        this.setPreviewContent = noop
    }

    private getPreviewContentDebounceFn () {
        return debounce((content = this.value) => {
            if (this.mode.preview) {
                if (content !== this.val) {
                    this.val = content
                    this.previewContent = content ? markdown.render(content) : ''
                }
            }
        }, 500)
    }

    private handleCommandClick (cmd) {
        switch (cmd.key) {
        // case 'grow':
        //   this.fullscreenMode = true
        //   break
        // case 'shrink':
        //   this.fullscreenMode = false
        //   break
        case 'preview':
            this.mode.preview = !this.mode.preview
            this.$nextTick(() => {
                this.setPreviewContent()
                if (!this.mode.preview) {
                    (this.$refs.input as any).focus()
                }
            })
            break
        default:
            if (this.mode.preview) return
            this.executeCommand(cmd)
            break
        }
    }

    private handleValueChange (e) {
        this.$emit('change', e.target.value)
        this.$emit('input', e.target.value)
    }

    private executeCommand (cmd) {
        const $input = this.$refs.input as any
        const newValue = cmd.execute ? cmd.execute(this.value, getSelection($input)) : null
        if (!newValue) return
        $input.focus()
        setSelection($input, 0, $input.value.length)
        document.execCommand('insertText', false, newValue.text)
        setSelection($input, newValue.selection[0], newValue.selection[1])
    }
}
