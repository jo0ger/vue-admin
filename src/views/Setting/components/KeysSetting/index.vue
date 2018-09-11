<!--
 * @desc KeysSetting
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-11 23:35:23
 -->
<template>
    <div class="keys-setting">
        <div class="keys-list">
            <template v-for="(item, index) in map">
                <Divider v-if="index" :key="index"></Divider>
                <div class="keys-item"
                    :class="item.type"
                    :key="item.type">
                    <div class="content">
                        <h4 class="name">{{ item.name }}</h4>
                        <p class="desc">{{ item.desc }}</p>
                    </div>
                    <div class="action">
                        <Button type="default" @click="open(item.type)">修改</Button>
                    </div>
                </div>
            </template>
        </div>
        <Modal width="400" v-model="visible" :title="cur && cur.name || ''">
            <div class="keys-form">
                <Form v-if="type === 'aliyun'" :label-width="120">
                    <FormItem label="Bucket">
                        <Input v-model.trim="model[type].bucket"></Input>
                    </FormItem>
                    <FormItem label="Region">
                        <Input v-model.trim="model[type].region"></Input>
                    </FormItem>
                    <FormItem label="AccessKeyId">
                        <Input v-model.trim="model[type].accessKeyId"></Input>
                    </FormItem>
                    <FormItem label="AccessKeySecret">
                        <Input v-model.trim="model[type].accessKeySecret"></Input>
                    </FormItem>
                </Form>
                <Form v-if="type === 'alinode'" :label-width="80">
                    <FormItem label="AppId">
                        <Input v-model.trim="model[type].appid"></Input>
                    </FormItem>
                    <FormItem label="Secret">
                        <Input v-model.trim="model[type].secret"></Input>
                    </FormItem>
                </Form>
                <Form v-if="type === 'aliApiGateway'" :label-width="80">
                    <h3>IP 查询</h3>
                    <FormItem label="AppCode">
                        <Input v-model.trim="model[type].ip.appCode"></Input>
                    </FormItem>
                </Form>
                <Form v-if="type === 'mail'" :label-width="80">
                    <FormItem label="用户名">
                        <Input v-model.trim="model[type].user"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model.trim="model[type].pass"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: center;">
                <Button type="primary" @click="submit">提交</Button>
                <Button @click="close">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
