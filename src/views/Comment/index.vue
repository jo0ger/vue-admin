<!--
 * @desc Comment
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:35
 -->
<template>
    <Container class="comment-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #f04134;background-color: #fcdbd9"></Avatar>
        <Alert show-icon :type="current.pageInfo.total ? 'info' : 'warning'">
            共找到 <b style="color: #FF8D13">{{ current.pageInfo.total }}</b> 条{{ current.title }}
        </Alert>

        <Card>
            <Tabs v-model="curTab" @on-click="tabChange">
                <TabPane
                    :label="type.label"
                    :name="type.type"
                    v-for="type in constant.COMMENT_TYPE"
                    :key="type.value">
                    {{ type.lbel }}
                    <div class="pager">
                        <Page
                            :current="current.pageInfo.current"
                            :total="current.pageInfo.total"
                            show-total
                            @on-change="pageChange"></Page>
                    </div>
                    <Table :columns="columns" :data="current.list" :loading="current.loading"></Table>
                    <div class="pager">
                        <Page
                            :current="current.pageInfo.current"
                            :total="current.pageInfo.total"
                            show-total
                            @on-change="pageChange"></Page>
                    </div>
                </TabPane>
            </Tabs>
        </Card>

        <Modal class="reply-dialog" width="500" :title="'回复' + current.title" v-model="dialogVisible" :mask-closable="false" @on-cancel="close">
            <div class="origin-content" v-if="replyTarget">
                <div class="i-editor-md" v-html="replyTarget.renderedContent"></div>
            </div>
            <Editor
                v-model="replyContent"
                :update-name="config.UPLOAD_NAME.COMMENT"
                :autosize="{ minRows: 10 }"
                placeholder="请输入回复内容"
                write-name="回复内容">
            </Editor>
            <div slot="footer">
                <Button type="primary" long :loading="replyLoading" @click="replySubmit">回复</Button>
            </div>
        </Modal>

        <Modal class="update-dialog" width="400" title="修改评论状态" v-model="updateDialogVisible" :mask-closable="false" @on-cancel="close">
            <Form ref="form" :label-width="60" :model="updateTarget" v-if="updateTarget">
                <FormItem label="状态" prop="name">
                    <RadioGroup v-model="updateTarget.state" type="button" style="min-width: 200px">
                        <Radio v-for="item in constant.COMMENT_STATE" :key="item.value" :label="item.value">{{ item.label }}</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align: center;">
                <Button type="primary" :loading="updateLoading" @click="updateStateSubmit">提交</Button>
                <Button type="default" @click="close">取消</Button>
            </div>
        </Modal>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
