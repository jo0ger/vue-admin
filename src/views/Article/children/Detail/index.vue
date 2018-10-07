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
                        <Form ref="baseInfoForm" :model="model" :label-width="70" :rules="rule">
                            <FormItem label="标题" prop="title">
                                <Input v-model.trim="model.title" placeholder="请填写文章标题"></Input>
                            </FormItem>
                            <FormItem label="简介" prop="description">
                                <Input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model.trim="model.description" placeholder="请填写文章简介"></Input>
                            </FormItem>
                            <FormItem label="关键词">
                                <TagList v-model="model.keywords" action-text="添加关键词"></TagList>
                            </FormItem>
                            <FormItem label="状态">
                                <RadioGroup size="small" v-model="model.state" type="button">
                                    <Radio v-for="item in constant.ARTICLE_STATE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="来源">
                                <RadioGroup size="small" v-model="model.source" type="button" @on-change="sourceChange">
                                    <Radio v-for="item in constant.ARTICLE_SOURCE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="转载自" prop="from" required v-if="model.source === 1">
                                <Input v-model.trim="model.from" placeholder="请填写转载地址"></Input>
                            </FormItem>
                            <FormItem label="创建时间" v-if="model.createdAt">
                                <time>{{ model.createdAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</time>
                            </FormItem>
                        </Form>
                    </Card>
                    <Card class="info-card" title="分类信息">
                        <Form ref="classifyForm" :model="model" :label-width="60" :rules="rule">
                            <FormItem label="分类" prop="category">
                                <Row :gutter="16">
                                    <Col span="16">
                                        <Select v-model="model.category" clearable style="width:100%;" placeholder="请选择分类">
                                            <Option v-for="item in cList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="6">
                                        <Button type="primary" @click="cDialogVisible = true">去创建</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem label="标签" prop="tag">
                                <Row :gutter="16">
                                    <Col span="16">
                                        <Select v-model="model.tag" multiple clearable style="width:100%;" placeholder="请选择标签">
                                            <Option v-for="item in tList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="6">
                                        <Button type="primary" @click="tDialogVisible = true">去创建</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Card>
                    <Card class="info-card" title="缩略图">
                        <Uploader
                            slot="extra"
                            type="image"
                            size="small"
                            :name="uploadName"
                            :url="model.thumb"
                            @on-success="uploadSuccess"
                            @on-delete="deleteThumb"></Uploader>
                        <div class="thumb">
                            <img :src="model.thumb" alt="" v-if="model.thumb">
                            <p v-else>请上传缩略图</p>
                        </div>
                    </Card>
                </Col>
                <Col span="16">
                    <Card class="info-card">
                        <!-- <MDEditor v-model="model.content"></MDEditor> -->
                        <i-editor v-model="model.content"
                            ref="editor"
                            affix
                            paste
                            :autosize="{ minRows: 50 }"
                            placeholder="请输入文章内容"
                            write-name="文章内容"
                            :config="{ action: '' }"
                            :before-upload="beforeUpload"></i-editor>
                    </Card>
                </Col>
            </Row>
        </div>
        <CTDialog v-model="cDialogVisible" type="category"></CTDialog>
        <CTDialog v-model="tDialogVisible" type="tag"></CTDialog>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
