<!--
 * @desc Article
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:43
 -->
<template>
    <Container class="article-list-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #2d8cf0;background-color: #e6f7ff"></Avatar>
        <Input slot="action" search enter-button="搜索" placeholder="搜索文章" style="width: 300px" v-model.trim="query.keyword" @on-search="keywordSearch" @on-enter="keywordSearch" />
        <Form :label-width="60" slot="filter">
            <FormItem label="分类项">
                <Form :label-width="80" inline>
                    <FormItem label="分类">
                        <Select v-model="filter.category" clearable style="width:200px" placeholder="请选择分类" @on-change="filterSearch">
                            <Option v-for="item in cList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="标签">
                        <Select v-model="filter.tag" clearable style="width:200px" placeholder="请选择标签" @on-change="filterSearch">
                            <Option v-for="item in tList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </FormItem>
            <FormItem label="筛选项">
                <Form :label-width="80" inline>
                    <FormItem label="状态">
                        <RadioGroup v-model="filter.state" type="button" style="width: 200px" @on-change="filterSearch">
                            <Radio :label="''">全部</Radio>
                            <Radio v-for="item in constant.ARTICLE_STATE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="来源">
                        <RadioGroup v-model="filter.source" type="button" style="width: 200px" @on-change="filterSearch">
                            <Radio :label="''">全部</Radio>
                            <Radio v-for="item in constant.ARTICLE_SOURCE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </FormItem>
            <FormItem label="时间项">
                <Form :label-width="80" inline>
                    <FormItem label="起始时间">
                        <DatePicker type="date" placeholder="请选择起始时间" style="width: 200px" @on-change="filterSearch" v-model="filter.startDate"></DatePicker>
                    </FormItem>
                    <FormItem label="终止时间">
                        <DatePicker type="date" placeholder="请选择终止时间" style="width: 200px" @on-change="filterSearch" v-model="filter.endDate"></DatePicker>
                    </FormItem>
                </Form>
            </FormItem>
        </Form>
        <div class="article-list">
            <Alert show-icon :type="pageInfo.total ? 'info' : 'warning'">
                共找到 <b style="color: #FF8D13">{{ pageInfo.total }}</b> 篇文章，
                共 <b style="color: #FF8D13">{{ pageInfo.pages }}</b> 页
            </Alert>
            <Card class="article-item" v-for="(article, index) in aList" :key="article._id">
                <div class="source" :class="[article.source ? 'reprint' : 'original']" v-if="article.source !== undefined">
                    {{ article.source | constantFilter('ARTICLE_SOURCE') }}
                </div>
                <div class="wrap">
                    <div class="main">
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
                            <div class="time">
                                <span>创建于 {{ article.createdAt | dateFormat }}</span>
                                <span>发布在 <a :href="article.permallink">{{ article.title }}</a></span>
                            </div>
                        </div>
                        <div class="action">
                            <Tag type="border" size="small" :color="article.state ? 'success' : 'warning'">{{ ['未发布', '已发布'][article.state] }}</Tag>
                            <ul class="meta-list">
                                <li class="meta-item">
                                    <Icon class="icon" type="ios-eye-outline" size="16" />
                                    {{ article.meta.pvs }}
                                </li>
                                <Divider type="vertical" />
                                <li class="meta-item">
                                    <Icon class="icon" type="ios-thumbs-up-outline" size="16" />
                                    {{ article.meta.ups }}
                                </li>
                                <Divider type="vertical" />
                                <li class="meta-item">
                                    <Icon class="icon" type="ios-text-outline" size="16" />
                                    {{ article.meta.comments }}
                                </li>
                            </ul>
                            <div class="operation">
                                <Button size="small" type="error" @click="deleteArticle(article, index)">删除</Button>
                            </div>
                        </div>
                    </div>
                    <div class="extra">
                        <div class="thumb" v-if="article.thumb">
                            <img :src="article.thumb || 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png'" alt="">
                        </div>
                    </div>
                </div>
            </Card>
            <Spin size="large" fix v-if="false"></Spin>
            <div class="loadmore" v-if="pageInfo.current < pageInfo.pages">
                <Button style="width: 150px" :loading="cLoading" @click="loadmore">加载更多</Button>
            </div>
        </div>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
