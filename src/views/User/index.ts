/**
 * @desc User
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:47
 */

import Vue from '@/vue'
import { Component } from '@/utils/decorators'

@Component({
    name: 'User',
})
export default class User extends Vue {
    private uList: WebApi.UserModule.User[] = []

    private uLoading: boolean = false

    private colResponsiveProps = {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 6,
    }

    private created () {
        this.getUserList()
    }

    private async getUserList () {
        if (this.uLoading) return
        this.uLoading = true
        const res = await this.api.user.list()
        this.uLoading = false
        if (res.success) {
            const format = 'YYYYMMDD'
            const today = this.moment()
            this.uList = res.data.map(item => {
                const date = this.moment(item.createdAt)
                if (date.format(format) === today.format(format)) {
                    (item as any).today = true
                } else if (date.isAfter(today.subtract(7, 'day'))) {
                    (item as any).week = true
                }
                return item
            })
        }
    }

    private async updateUserMute (user) {
        if (user.loading) return
        user.loading = true
        const mute = !user.mute
        const res = await this.api.user.update(user._id, { mute })
        delete user.loading
        if (res.success) {
            user.mute = mute
            this.$Message.success(res.message)
        }
    }
}