<!--
 * @desc TagList
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 15:11:57
 -->
<template>
    <div class="tag-list">
        <Tag v-bind="$attrs" v-for="(v, index) in val" :key="index" :name="index" :closable="canEdit" @on-close="deleteTag(index)">{{ v }}</Tag>
        <span class="action" v-if="canEdit">
            <Button icon="md-add" type="dashed" size="small" v-if="!adding" @click="toogleTagAdd">{{ actionText }}</Button>
            <Input size="small" style="width: 84px;" v-model="input" v-else @on-enter="addTag"></Input>
        </span>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
