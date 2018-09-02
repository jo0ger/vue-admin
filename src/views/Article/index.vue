<!--
 * @desc Article
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:43
 -->
<template>
    <Container class="dashboard" title="文章列表">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #f56a00;background-color: #fde3cf">U</Avatar>
        <Input slot="action" search enter-button="搜索" placeholder="搜索文章" style="width: 300px" />
        <Card>
            <Form :label-width="60">
                <FormItem label="分类项">
                    <Form :label-width="60" inline>
                        <FormItem label="分类">
                            <Select v-model="filter.category" style="width:200px" placeholder="请选择分类">
                                <Option v-for="item in cList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="标签">
                            <Select v-model="filter.tag" style="width:200px" placeholder="请选择标签">
                                <Option v-for="item in tList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </FormItem>
                <FormItem label="筛选项">
                    <Form :label-width="60" inline>
                        <FormItem label="状态">
                            <RadioGroup v-model="filter.state" type="button" style="width: 200px">
                                <Radio :label="''">全部</Radio>
                                <Radio :label="1">已发布</Radio>
                                <Radio :label="0">未发布</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="来源">
                            <RadioGroup v-model="filter.source" type="button" style="width: 200px">
                                <Radio :label="''">全部</Radio>
                                <Radio :label="0">原创</Radio>
                                <Radio :label="1">转载</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </FormItem>
                <FormItem label="时间项">

                </FormItem>
            </Form>
        </Card>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
