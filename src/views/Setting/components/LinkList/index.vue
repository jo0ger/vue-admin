<!--
 * @desc LinkList
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 18:23:20
 -->
<template>
    <div class="link-list">
        <Button icon="md-add" type="dashed" long class="add-link-btn" @click="addLink">{{ model.id ? '更新' : '添加'}}友链</Button>
        <Row :gutter="16">
            <Col v-bind="linkColResponsiveProps" v-for="(link, index) in setting.site.links" :key="index">
                <div class="link-item">
                    <div class="action">
                        <span class="action-item edit-btn" @click="editLink(link)">
                            <Icon type="md-create" size="24" />
                        </span>
                        <Poptip
                            class="action-item delete-btn"
                            confirm
                            title="确定删除该友军吗？"
                            @on-ok="deleteLink(link, index)">
                            <span>
                                <Icon type="md-close-circle" size="24" />
                            </span>
                        </Poptip>
                    </div>
                    <div class="wrap">
                        <img :src="link.avatar" class="avatar" alt="">
                        <div class="content">
                            <h3 class="name">{{ link.name }}</h3>
                            <p class="slogan">
                                {{ link.slogan }}
                            </p>
                            <p class="site">
                                <Icon class="icon" type="md-globe" />
                                <a :href="link.site" target="_blank">{{ link.site }}</a>
                            </p>
                            <p class="github">
                                <Icon class="icon" type="logo-github" />
                                <a :href="'https://github.com/' + link.github" target="_blank" v-if="link.github">{{ link.github }}</a>
                                <a v-else>暂无</a>
                            </p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal width="400" title="添加友链" v-model="linkDialogVisible">
            <Form ref="linkForm" :label-width="60">
                <FormItem label="名称">
                    <Input v-model.trim="model.name" placeholder="请填写名称"></Input>
                </FormItem>
                <FormItem label="头像">
                    <Input v-model.trim="model.avatar" placeholder="请填写头像"></Input>
                </FormItem>
                <FormItem label="简介">
                    <Input v-model.trim="model.slogan" placeholder="请填写简介"></Input>
                </FormItem>
                <FormItem label="网站">
                    <Input v-model.trim="model.site" placeholder="请填写网站"></Input>
                </FormItem>
                <FormItem label="Github">
                    <Input v-model.trim="model.github" placeholder="请填写Github名称"></Input>
                </FormItem>
            </Form>
            <div class="action" style="text-align: center;" slot="footer">
                <Button type="primary" @click="submit">{{ model.id ? '更新' : '添加'}}</Button>
                <Button @click="close">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
