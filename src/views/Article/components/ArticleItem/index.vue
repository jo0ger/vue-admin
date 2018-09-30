<!--
 * @desc ArticleItem
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-07 21:30:08
 -->
<template>
    <Card class="article-item" :class="{ 'article-item-tip': tip }">
        <div class="source" :class="[article.source ? 'reprint' : 'original']" v-if="article.source !== undefined">
            {{ article.source | constantFilter('ARTICLE_SOURCE') }}
        </div>
        <div class="wrap">
            <div class="main">
                <div class="detail">
                    <div class="extra" v-if="article.thumb">
                        <div class="thumb" v-if="article.thumb">
                            <img :src="article.thumb" alt="">
                        </div>
                    </div>
                    <div class="content">
                        <h4 class="title">
                            <Tooltip v-if="article.category" placement="right" max-width="200" :content="article.category.description || '暂无简介'">
                                <Avatar class="category"
                                    :src="article.category.extends | extendsFilter('image')"
                                    v-if="findExtendsItem(article.category.extends, 'image')">{{ article.category.name }}</Avatar>
                                <Avatar class="category"
                                    :style="{
                                        color: findExtendsItem(article.category.extends, 'color'),
                                        backgroundColor: findExtendsItem(article.category.extends, 'background')
                                    }"
                                    v-else>{{ article.category.name.slice(0, 2) }}</Avatar>
                            </Tooltip>
                            <router-link :to="{ name: 'ArticleDetail', params: { id: article._id }}">{{ article.title }}</router-link>
                        </h4>
                        <div class="tag-list" v-if="article.tag.length">
                            <Tooltip max-width="200" v-for="tag in article.tag" :key="tag._id" placement="top" :content="tag.description || '暂无简介'">
                                <Tag>{{ tag.name }}</Tag>
                            </Tooltip>
                        </div>
                        <div class="description">{{ article.description }}</div>
                        <div class="meta">
                            <Tag size="small" :color="article.state ? 'success' : 'warning'">{{ ['未发布', '已发布'][article.state] }}</Tag>
                            <ul class="meta-list">
                                <li class="meta-item">
                                    <Icon class="icon" type="md-eye" />
                                    {{ article.meta.pvs }}
                                </li>
                                <Divider type="vertical" />
                                <li class="meta-item">
                                    <Icon class="icon" type="md-thumbs-up" />
                                    {{ article.meta.ups }}
                                </li>
                                <Divider type="vertical" />
                                <li class="meta-item">
                                    <Icon class="icon" type="md-text" />
                                    {{ article.meta.comments }}
                                </li>
                            </ul>
                            <div class="time">
                                <span><Icon wsize="14" type="md-time" /><Time :time="article.createdAt"></Time></span>
                                <span><Icon wsize="14" type="md-create" /><Time :time="article.updatedAt"></Time></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action" v-if="!tip">
                <div class="action-item publish" :class="[article.state && 'publish-down']" @click="changeState(article, index)">
                    <span class="icon">
                        <Icon size="12" :type="['md-trending-up', 'md-trending-down'][article.state]" />
                    </span>
                    <span class="label">{{ ['发布', '下线'][article.state] }}</span>
                </div>
                <div class="action-item edit" @click="$router.push({ name: 'ArticleDetail', params: { id: article._id }})">
                    <span class="icon">
                        <Icon size="12" type="md-create" />
                    </span>
                    <span class="label">编辑</span>
                </div>
                <a class="action-item view" :href="this.config.SITE + '/articles/' + article._id" target="_blank" v-if="article.state">
                    <span class="icon">
                        <Icon size="12" type="md-eye" />
                    </span>
                    <span class="label">查看</span>
                </a>
                <div class="action-item delete" @click="deleteArticle(article, index)">
                    <span class="icon">
                        <Icon size="12" type="md-trash" />
                    </span>
                    <span class="label">删除</span>
                </div>
            </div>
        </div>
    </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
