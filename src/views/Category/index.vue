<!--
 * @desc Category
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:58
 -->
<template>
    <Container class="category-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #f56a00;background-color: #fde3cf"></Avatar>
        <Input slot="action" search enter-button="搜索" placeholder="搜索分类" style="width: 300px" v-model.trim="query.keyword" @on-search="search" @on-enter="search" />
        <Alert show-icon :type="cList.length ? 'info' : 'warning'">
            共找到 <b style="color: #FF8D13">{{ cList.length }}</b> 个分类，
        </Alert>
        <Row :gutter="16" class="category-list">
            <Col v-bind="colResponsiveProps" class="category-item">
                <Button icon="md-add" type="dashed" class="create-btn" @click="add">添加分类</Button>
            </Col>
            <Col v-bind="colResponsiveProps" v-for="item in cList" :key="item._id" class="category-item">
                <Card :title="item.name" :icon="findExtendsItem(item.extends, 'icon')">
                    <Avatar slot="extra"
                        size="small"
                        :src="item.extends | extendsFilter('image')"
                        v-if="findExtendsItem(item.extends, 'image')">{{ item.name }}</Avatar>
                    <Avatar slot="extra"
                        size="small"
                        :style="{
                            color: findExtendsItem(item.extends, 'color'),
                            backgroundColor: findExtendsItem(item.extends, 'background')
                        }"
                        v-else>{{ item.name.slice(0, 2) }}</Avatar>
                    <div class="content">
                        <p class="description">{{ item.description }}</p>
                        <div class="count">
                            <p>关联文章</p>
                            <p>{{ item.count }}</p>
                        </div>
                    </div>
                    <ul class="action">
                        <li class="action-item">
                            <Tooltip placement="top" content="编辑">
                                <span><a><Icon type="ios-create-outline" size="20" class="action-icon" @click="edit(item)"></Icon></a></span>
                            </Tooltip>
                        </li>
                        <li class="action-item">
                            <Tooltip placement="top" content="删除">
                                <span><a><Icon type="ios-trash-outline" size="20" class="action-icon" @click="deleteItem(item)"></Icon></a></span>
                            </Tooltip>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <CTDialog v-model="ctDialogVisible"
            type="category"
            :id="curCategory && curCategory._id || ''"></CTDialog>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
