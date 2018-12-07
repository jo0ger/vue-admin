<!--
 * @desc Moment
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-11-29 15:47:20
 -->
<template>
    <Container class="moment-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #f04134;background-color: #fcdbd9"></Avatar>
        <Input slot="action" search enter-button="搜索" placeholder="搜索说说" style="width: 300px" v-model.trim="query.keyword" @on-search="search" @on-enter="search" />
        <Alert show-icon :type="pageInfo.total ? 'info' : 'warning'">
            共找到 <b style="color: #FF8D13">{{ pageInfo.total }}</b> 条说说
        </Alert>
        <Button icon="md-add" type="dashed" long class="add-moment-btn" @click="add">新建说说</Button>
        <Table :columns="columns" :data="list" :loading="loading"></Table>
        <div class="pager">
            <Page
                :total="pageInfo.total"
                @on-change="pageChange"></Page>
        </div>

        <Modal class="moment-dialog" width="500" :title="title" v-model="dialogVisible" :mask-closable="false">
            <Form ref="form" :label-width="60" :model="curMoment" :rules="rule">
                <FormItem label="内容" prop="content">
                    <Input type="textarea" v-model="curMoment.content" placeholder="请填写内容"></Input>
                </FormItem>
            </Form>
            <div class="action" slot="footer">
                <Button type="primary" @click="submit">提交</Button>
                <Button @click="dialogVisible = false">取消</Button>
            </div>
        </Modal>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
