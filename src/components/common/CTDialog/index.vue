<!--
 * @desc CTDialog
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-05 01:00:20
 -->
<template>
    <Modal class="ct-dialog" width="500" :title="title" v-model="visible" v-bind="$attrs" v-on="$listeners" :mask-closable="false">
        <Form ref="form" :label-width="60" :model="model" :rules="rule">
            <FormItem label="名称" prop="name">
                <Input v-model="model.name" placeholder="请填写名称"></Input>
            </FormItem>
            <FormItem label="描述">
                <Input type="textarea" v-model="model.description" placeholder="请填写描述"></Input>
            </FormItem>
            <FormItem label="扩展项" prop="extends">
                <Row style="margin-bottom: 8px" type="flex" :gutter="8" v-for="(ext, index) in model.extends" :key="index">
                    <Col span="4">
                        <Input v-model="ext.key" placeholder="扩展项Key"></Input>
                    </Col>
                    <Col span="10">
                        <Input v-model="ext.value" placeholder="扩展项Value"></Input>
                    </Col>
                    <Col span="9">
                        <Uploader
                            v-if="ext.key === 'image'"
                            style="margin-right: 8px;"
                            type="image"
                            :name="config.UPLOAD_NAME.CATEGORY"
                            :url="ext.value"
                            @on-success="url => uploadSuccess(index, url)"></Uploader>
                        <Button type="error" @click="deleteExt(ext, index)">删除</Button>
                    </Col>
                </Row>
                <Button long icon="md-add" type="dashed" class="ext-add-btn" @click="addExt">添加扩展</Button>
            </FormItem>
        </Form>
        <div class="action" slot="footer">
            <Button type="primary" @click="submit">提交</Button>
            <Button @click="visible = false">取消</Button>
        </div>
    </Modal>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
