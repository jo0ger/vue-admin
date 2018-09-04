<!--
 * @desc Auth
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:54:03
 -->
<template>
    <Container class="auth-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #ed4014;background-color: #fff1f0"></Avatar>
        <div slot="action">
            <Button type="primary" @click="editMode = true" v-if="!editMode">编辑</Button>
            <template v-else>
                <Button type="primary">提交</Button>
                <Button style="margin-left: 8px" @click="editMode = false">取消</Button>
            </template>
        </div>
        <Row :gutter="24">
            <Col span="8">
                <Card>
                    <div class="account">
                        <img :src="admin.avatar" alt="" class="avatar">
                        <h1 class="name">{{ admin.name }}</h1>
                        <p class="slogan">{{ admin.slogan }}</p>
                    </div>
                    <div class="profile">
                        <p class="description">
                            <Icon class="icon" type="md-person" />
                            {{ setting.site.description }}
                        </p>
                        <p class="skill">
                            <Icon class="icon" type="md-hammer" />
                            {{ setting.site.skill }}
                        </p>
                        <p class="hobby">
                            <Icon class="icon" type="md-heart" />
                            {{ setting.site.hobby }}
                        </p>
                        <p class="location">
                            <Icon class="icon" type="md-compass" />
                            {{ setting.site.location }}
                        </p>
                        <p class="company">
                            <Icon class="icon" type="md-code-working" />
                            {{ setting.site.company }}
                        </p>
                    </div>
                    <Divider></Divider>
                    <div class="tags">
                        <h3 class="label">标签</h3>
                        <div class="tag-list">
                            <Tag v-for="(item, index) in setting.site.tags" :key="item" :name="item" closable @on-close="deleteTag(item, index)">{{ item }}</Tag>
                            <Button icon="ios-add" type="dashed" size="small" @click="addTag">添加标签</Button>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col span="16">
                <Card>
                    <Tabs value="name1">
                        <TabPane label="友链" name="name1">友链</TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
