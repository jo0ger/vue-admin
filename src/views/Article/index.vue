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
            <ArticleItem
                :article="article"
                :index="index"
                v-for="article in aList" :key="article._id"
                @on-delete="deleteArticle"
                @on-change-state="changeState"></ArticleItem>
            <Spin size="large" fix v-if="false"></Spin>
            <div class="loadmore" v-if="pageInfo.current < pageInfo.pages">
                <Button style="width: 150px" :loading="cLoading" @click="loadmore">加载更多</Button>
            </div>
        </div>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
