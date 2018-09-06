<!--
 * @desc Tag
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:51:58
 -->
<template>
    <Container class="tag-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #d3adf7;background-color: #f9f0ff"></Avatar>
        <Input slot="action" search enter-button="搜索" placeholder="搜索标签" style="width: 300px" v-model.trim="query.keyword" @on-search="search" @on-enter="search" />
        <Alert show-icon :type="tList.length ? 'info' : 'warning'">
            共找到 <b style="color: #FF8D13">{{ tList.length }}</b> 个标签
        </Alert>
        <Row :gutter="16" class="tag-list">
            <Col v-bind="colResponsiveProps">
                <Button icon="md-add" type="dashed" class="create-btn" @click="add">添加标签</Button>
            </Col>
            <Col v-bind="colResponsiveProps" v-for="item in tList" :key="item._id" class="tag-item">
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
                            <span><a><Icon type="ios-create-outline" size="18" class="action-icon" @click="edit(item)"></Icon></a></span>
                        </li>
                        <li class="action-item">
                            <span><a><Icon type="ios-trash-outline" size="18" class="action-icon" @click="deleteItem(item)"></Icon></a></span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <CTDialog v-model="ctDialogVisible"
            type="tag"
            :id="curTag && curTag._id || ''"></CTDialog>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
