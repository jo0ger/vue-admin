/**
 * @desc UpdatePassword
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 19:16:06
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'

const { Action } = namespace('auth')

@Component({
    name: 'UpdatePassword',
})
export default class UpdatePassword extends Vue {
    @Action updatePassword
    
    private model = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    }

    private async submit () {
        (this.$refs.form as any).validate(async valid => {
            if (!valid) return
            await this.updatePassword({
                oldPassword: this.model.oldPassword,
                password: this.model.password
            })
            this.model.password = ''
            this.model.oldPassword = ''
            this.model.confirmPassword = ''
        })
    }

    private get rules () {
        const passValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写新密码'))
            } else {
                if (this.model.confirmPassword !== '') {
                    (this.$refs.form as any).validateField('confirmPassword')
                }
                callback()
            }
        }
        const confirmPassValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写确认密码'))
            } else if (value !== this.model.password) {
                callback(new Error('两次密码不相同'))
            } else {
                callback()
            }
        }
        return {
            oldPassword: [
                { required: true, message: '请填写原密码', trigger: 'blur' }
            ],
            password: [
                { validator: passValidator, required: true, trigger: 'blur' }
            ],
            confirmPassword: [
                { validator: confirmPassValidator, required: true, trigger: 'blur' }
            ]
        }
    }
}