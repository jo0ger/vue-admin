<!--
 * @desc ArticleItem
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-07 21:30:08
 -->
<template>
    <Card class="article-item">
        <div class="source" :class="[article.source ? 'reprint' : 'original']" v-if="article.source !== undefined">
            {{ article.source | constantFilter('ARTICLE_SOURCE') }}
        </div>
        <div class="wrap">
            <div class="main">
                <div class="detail">
                    <div class="extra">
                        <div class="thumb" v-if="article.thumb">
                            <img :src="article.thumb || 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png'" alt="">
                        </div>
                    </div>
                    <div class="content">
                        <h4 class="title">
                            <Tooltip v-if="article.category" placement="right" :content="article.category.description">
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
                            <Tooltip v-for="tag in article.tag" :key="tag._id" placement="top" :content="tag.description">
                                <Tag>{{ tag.name }}</Tag>
                            </Tooltip>
                        </div>
                        <div class="description">{{ article.description }}</div>
                        <div class="meta">
                            <Tag type="border" size="small" :color="article.state ? 'success' : 'warning'" @click.native="changeState(article, index)">{{ ['未发布', '已发布'][article.state] }}</Tag>
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
                                <span><Icon wsize="14" type="md-time" /> <Time :time="article.createdAt"></Time></span>
                                <span><Icon wsize="14" type="md-create" /><Time :time="article.updatedAt"></Time></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action">
                <div class="action-item edit" @click="$router.push({ name: 'ArticleDetail', params: { id: article._id }})">
                    <span class="icon">
                        <Icon size="12" type="md-create" />
                    </span>
                    <span class="label">编辑</span>
                </div>
                <a class="action-item view" :href="article.permallink" target="_blank" v-if="article.state">
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
