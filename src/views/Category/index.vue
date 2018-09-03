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
            <Col span="6">
                <Button icon="md-add" type="dashed" class="create-btn" @click="add">添加分类</Button>
            </Col>
            <Col span="6" v-for="item in cList" :key="item._id" class="category-item">
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
                    <p class="description">{{ item.description }}</p>
                    <ul class="action">
                        <li class="action-item">
                            <span><a><Icon type="ios-create-outline" size="18" class="action-icon"></Icon></a></span>
                        </li>
                        <li class="action-item">
                            <span><a><Icon type="ios-trash-outline" size="18" class="action-icon" @click="deleteItem(item)"></Icon></a></span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
