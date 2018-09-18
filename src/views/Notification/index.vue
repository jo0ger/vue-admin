<!--
 * @desc Notification
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:29
 -->
<template>
    <Container class="notification-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: rgb(241,64,75);background-color: rgba(241,64,75, .2)"></Avatar>
        <Row :gutter="16">
            <Col span="6">
                <Card class="viewed-card">
                    <div class="content">
                        <Menu
                            theme="light"
                            :active-name="mode"
                            class="setting-menu"
                            style="width: 100%;"
                            @on-select="modeChange">
                            <MenuItem name="all">
                                <Icon size="16" type="md-list" />
                                全部
                            </MenuItem>
                            <MenuItem name="unviewed">
                                <Icon size="16" type="md-attach" />
                                未读
                                <Badge style="float: right; right: 0;" :count="nTotal"></Badge>
                            </MenuItem>
                            <MenuItem name="viewed">
                                <Icon size="16" type="md-checkmark-circle-outline" />
                                已读
                            </MenuItem>
                        </Menu>
                    </div>
                </Card>
            </Col>
            <Col span="18">
                <Card>
                    <Tabs v-model="query.type" @on-click="typeChange">
                        <TabPane
                            :label="mode !== 'unviewed' ? type.label : h => renderCount(h, type)"
                            :name="type.value"
                            :icon="type.icon"
                            v-for="type in constant.NOTIFICATION_TYPE"
                            :key="type.value">
                            <div class="n-list">
                                <Alert show-icon :type="listMap[type.value].pageInfo.total ? 'info' : 'warning'">
                                    共找到 <b style="color: #FF8D13">{{ listMap[type.value].pageInfo.total }}</b> 条通告，
                                    共 <b style="color: #FF8D13">{{ listMap[type.value].pageInfo.pages }}</b> 页
                                </Alert>
                                <div class="pager">
                                    <Page
                                        :total="listMap[type.value].pageInfo.total"
                                        @on-change="pageChange"></Page>
                                </div>
                                <div class="n-item" v-for="(item, index) in listMap[type.value].list" :key="item._id">
                                    <div class="viewed-tag" v-if="item.viewed">已读</div>
                                    <div class="wrap">
                                        <div class="title">
                                            <div class="from">
                                                <template v-if="item.actors && item.actors.from">
                                                    <Avatar size="small" :src="item.actors.from.avatar"></Avatar>
                                                    <h4 class="name">{{ item.actors.from.name }}</h4>
                                                </template>
                                                <template v-else>
                                                    <Avatar size="small">匿</Avatar>
                                                    <h4 class="name">陌生人</h4>
                                                </template>
                                            </div>
                                            <div class="to" v-if="item.actors && item.actors.to">
                                                <Icon class="to-icon" size="16" type="md-arrow-round-forward" />
                                                <Avatar size="small" :src="item.actors.to.avatar"></Avatar>
                                                <h4 class="name">{{ item.actors.to.name }}</h4>
                                            </div>
                                        </div>
                                        <p class="verb">
                                            <Tooltip :content="item.verb" max-width="400" placement="top">
                                                <div class="verb-content">
                                                    {{ item.verb }}
                                                </div>
                                            </Tooltip>
                                        </p>
                                        <div class="meta">
                                            <div class="meta-item time" v-if="item.createdAt">
                                                <Icon class="icon" type="md-time" />
                                                <Time :time="item.createdAt"></Time>
                                            </div>
                                            <div class="meta-item target" v-if="item.target">
                                                <span class="target-item article" v-if="item.target.article">
                                                    <Icon class="icon" type="md-book" />
                                                    <Poptip width="800" placement="bottom-start" trigger="click">
                                                        <ArticleItem slot="content" :article="item.target.article" :tip="true" :index="index"></ArticleItem>
                                                        {{ item.target.article.title }}
                                                    </Poptip>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="action">
                                        <div class="action-item view" v-if="!item.viewed" @click="viewItem(item, index, type)">
                                            <Tooltip content="已读" placement="top">
                                                <Icon size="20" type="md-checkmark-circle" />
                                            </Tooltip>
                                        </div>
                                        <div class="action-item delete" @click="deleteItem(item, index, type)">
                                            <Tooltip content="删除" placement="top">
                                                <Icon size="20" type="md-trash" />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>

<style lang="stylus">
@import '~@/assets/style/init'

.notification-page {
    .viewed-card {
        .ivu-card-body {
            padding 0
        }
    }

    .ivu-poptip-body {
        padding 0
    }

    .ivu-tabs {
        overflow -webkit-paged-x
    }

    .unviewed-count {
        background-color rgba(241,64,75, .2)
        color rgb(241,64,75)
    }
}
</style>

