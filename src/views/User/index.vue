<!--
 * @desc User
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:47
 -->
<template>
    <Container class="user-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: rgba(248,181,0);background-color: rgba(248,181,0, .2)"></Avatar>
        <Alert show-icon :type="uList.length ? 'info' : 'warning'">
            共找到 <b style="color: #FF8D13">{{ uList.length }}</b> 个用户
        </Alert>
        <Row :gutter="16">
            <Col v-bind="colResponsiveProps" v-for="item in uList" :key="item._id">
                <div class="user-item">
                    <span class="today tag" v-if="item.today">今</span>
                    <span class="week tag" v-if="item.week">周</span>
                    <div class="wrap">
                        <div class="avatar">
                            <img :src="item.avatar" alt="">
                            <transition name="fade">
                                <span class="mute" v-if="item.mute"></span>
                            </transition>
                            <Button class="action" size="small" @click="updateUserMute(item)">{{ item.mute ? '解禁' : '禁言' }}</Button>
                        </div>
                        <div class="content">
                            <h3 class="name">{{ item.name }}</h3>
                            <p class="email">
                                <Icon class="icon" type="md-send" size="16" />
                                <a :href="'mailto:' + item.email">{{ item.email }}</a>
                            </p>
                            <p class="site">
                                <Icon class="icon" type="md-link" size="16" />
                                <a :href="item.site" target="_blank">{{ item.site }}</a>
                            </p>
                        </div>
                        <div class="meta">
                            <time class="time">{{ item.createdAt | dateFormat('YYYY-MM-DD') }}</time>
                            <div class="comment-count">
                                <span>{{ item.comments }}</span>
                                <Icon class="icon" type="md-text" size="16" />
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
