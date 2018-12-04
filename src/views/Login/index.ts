/**
 * @desc Login
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:58:32
 */

import Vue from '@/vue'
import { namespace } from 'vuex-class'
import { Component } from '@/utils/decorators'
import { Background } from '@/components/common'

const { Getter, Action } = namespace('auth')

@Component({
    name: 'Login',
    layout: 'empty',
    components: {
        Background,
    },
})
export default class Login extends Vue {
    @Getter public loading
    @Action public login

    public ruleValidate = {
        username: [
            { required: true, message: '请填写登录名' },
        ],
        password: [
            { required: true, message: '请填写密码' },
        ],
    }

    public model = {
        username: '',
        password: '',
    }

    public submit () {
        (this.$refs.form as any).validate(async valid => {
            if (valid) {
                const success = await this.login(this.model)
                if (success) {
                    const query = this.$route.query
                    this.$router.push({
                        name: (query.redirect_uri_name as string) || 'Dashboard',
                        params: JSON.parse((query.redirect_params as string) || '{}'),
                        query: JSON.parse((query.redirect_query as string) || '{}'),
                    })
                }
            }
        })
    }
}
