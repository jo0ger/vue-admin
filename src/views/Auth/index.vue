<!--
 * @desc Auth
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:54:03
 -->
<template>
    <Container class="auth-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: rgb(83,199,240);background-color: rgba(83,199,240, .2)"></Avatar>
        <Card>
            <div class="content">
                <Menu theme="light" :active-name="menu" class="auth-menu" @on-select="menuSelect">
                    <MenuItem name="info">
                        <Icon type="md-document" />
                        个人信息
                    </MenuItem>
                    <MenuItem name="pass">
                        <Icon type="md-document" />
                        更新密码
                    </MenuItem>
                </Menu>
                <div class="details">
                    <div class="info" v-if="menu === 'info'">
                        <h2 class="label">个人信息</h2>
                        <div class="account-info">
                            <div class="account">
                                <div class="avatar">
                                    <img :src="admin.avatar" alt="" v-if="admin.avatar">
                                    <Uploader
                                        style="display: block;"
                                        :name="config.UPLOAD_NAME.AUTH"
                                        :url="admin.avatar"
                                        size="small"
                                        type="image"
                                        @on-success="uploadSuccess"
                                        @on-delete="deleteThumb"></Uploader>
                                </div>
                                <h1 class="name">
                                    <EditInput type="textarea" autosize :value="admin.name" @on-submit="(val, done) => authUpdate('name', val, done)"></EditInput>
                                </h1>
                                <p class="slogan">
                                    <EditInput type="textarea" autosize :value="setting.personal.slogan" @on-submit="(val, done) => personalUpdate('slogan', val, done)"></EditInput>
                                </p>
                            </div>
                            <div class="profile">
                                <p class="github">
                                    <Tooltip placement="top" content="Github">
                                        <Icon size="16" class="icon" type="logo-github" />
                                    </Tooltip>
                                    <EditInput :value="setting.personal.github.login" @on-submit="(val, done) => personalUpdate('github', val, done)"></EditInput>
                                </p>
                                <p class="description">
                                    <Tooltip placement="top" content="个人简介">
                                        <Icon size="16" class="icon" type="md-person" />
                                    </Tooltip>
                                    <EditInput type="textarea" autosize :value="setting.personal.description" @on-submit="(val, done) => personalUpdate('description', val, done)"></EditInput>
                                </p>
                                <p class="skill">
                                    <Tooltip placement="top" content="掌握技能">
                                        <Icon size="16" class="icon" type="md-hammer" />
                                    </Tooltip>
                                    <TagList :value="setting.personal.skill" action-text="添加技能"
                                        @on-change="(val, done) => personalUpdate('skill', val, done)"
                                        @on-delete="val => personalUpdate('skill', val)"></TagList>
                                </p>
                                <p class="hobby">
                                    <Tooltip placement="top" content="个人爱好">
                                        <Icon size="16" class="icon" type="md-heart" />
                                    </Tooltip>
                                    <TagList :value="setting.personal.hobby" action-text="添加爱好"
                                        @on-change="(val, done) => personalUpdate('hobby', val, done)"
                                        @on-delete="val => personalUpdate('hobby', val)"></TagList>
                                </p>
                                <p class="location">
                                    <Tooltip placement="top" content="当前所在地">
                                        <Icon size="16" class="icon" type="md-compass" />
                                    </Tooltip>
                                    <EditInput :value="setting.personal.location" @on-submit="(val, done) => personalUpdate('location', val, done)"></EditInput>
                                </p>
                                <p class="company">
                                    <Tooltip placement="top" content="当前任职公司">
                                        <Icon size="16" class="icon" type="md-trophy" />
                                    </Tooltip>
                                    <EditInput :value="setting.personal.company" @on-submit="(val, done) => personalUpdate('company', val, done)"></EditInput>
                                </p>
                            </div>
                            <Divider></Divider>
                            <div class="tags">
                                <h3 class="label">标签</h3>
                                <div class="tag-list">
                                    <TagList :value="setting.personal.tag"
                                        @on-change="(val, done) => personalUpdate('tag', val, done)"
                                        @on-delete="val => personalUpdate('tag', val)"></TagList>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pass" v-if="menu === 'pass'">
                        <h2 class="label">更新密码</h2>
                        <UpdatePassword></UpdatePassword>
                    </div>
                </div>
            </div>
        </Card>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
