<!--
 * @desc UpdatePassword
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 19:16:06
 -->
<template>
    <div class="update-password">
        <Form ref="form" :model="model" :label-width="80" :rules="rules">
            <FormItem label="原密码" prop="oldPassword">
                <Input type="password" style="width: 250px" v-model.trim="model.oldPassword" placeholder="请填写原密码"></Input>
            </FormItem>
            <FormItem label="新密码" prop="password">
                <Input type="password" style="width: 250px" v-model.trim="model.password" placeholder="请填写新密码"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="confirmPassword">
                <Input type="password" style="width: 250px" v-model.trim="model.confirmPassword" placeholder="请填写确认密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
