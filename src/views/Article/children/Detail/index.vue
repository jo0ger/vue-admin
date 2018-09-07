<!--
 * @desc Detail
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 15:24:15
 -->
<template>
    <Container class="article-detail"  :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #53c7f0;background-color: #e6f7ff"></Avatar>
        <div slot="action">
            <Button class="action-item" type="primary" @click="submit">提交</Button>
            <Button class="action-item" @click="$router.back()">返回</Button>
        </div>
        <div class="info">
            <Row :gutter="16">
                <Col span="8">
                    <Card class="info-card" title="基本信息">
                        <Form ref="baseInfoForm" :model="model" :label-width="60">
                            <FormItem label="标题" prop="title">
                                <Input v-model="model.title" placeholder="请填写文章标题"></Input>
                            </FormItem>
                            <FormItem label="简介" prop="description">
                                <Input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="model.description" placeholder="请填写文章简介"></Input>
                            </FormItem>
                            <FormItem label="关键词" prop="keywords">
                                <Tag v-for="(keyword, index) in model.keywords" :key="keyword" :name="keyword" closable @on-close="deleteTag(index)">{{ keyword }}</Tag>
                                <Button icon="md-add" type="dashed" size="small" v-if="!keyword.adding" @click="toggleKeywordAdd">添加标签</Button>
                                <Input size="small" style="width: 84px;" v-model="keyword.input" v-else @on-enter="addKeyword"></Input>
                            </FormItem>
                            <FormItem label="状态">
                                <RadioGroup size="small" v-model="model.state" type="button">
                                    <Radio v-for="item in constant.ARTICLE_STATE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="来源">
                                <RadioGroup size="small" v-model="model.source" type="button">
                                    <Radio v-for="item in constant.ARTICLE_SOURCE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Form>
                    </Card>
                    <Card class="info-card" title="分类信息">
                        <Form ref="classifyForm" :model="model" :label-width="60">
                            <FormItem label="分类">
                                <Select v-model="model.category" clearable style="width:200px" placeholder="请选择分类">
                                    <Option v-for="item in cList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="标签">
                                <Select v-model="model.tag" multiple clearable style="width:200px" placeholder="请选择标签">
                                    <Option v-for="item in tList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Card>
                    <Card class="info-card" title="缩略图"></Card>
                </Col>
                <Col span="16">
                    <Card class="info-card" title="文章内容">
                        <Button type="primary" icon="md-cloud-upload" slot="extra">上传文件</Button>
                        <MDEditor v-model="model.content"></MDEditor>
                    </Card>
                </Col>
            </Row>
        </div>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
