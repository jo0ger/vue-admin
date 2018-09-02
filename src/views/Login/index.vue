<!--
 * @desc Login
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:58:32
 -->
<template>
    <div class="login-page">
        <Background></Background>
        <div class="wrap">
            <div class="content">
                <div class="top"></div>
                <div class="main">
                    <Form ref="form" :model="model" :rules="ruleValidate">
                        <FormItem prop="username">
                            <Input prefix="md-contact" placeholder="请输入登录名" v-model.trim="model.username" />
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" prefix="md-key" placeholder="请输入密码" v-model.trim="model.password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" :loading="loading" long @click="submit">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
