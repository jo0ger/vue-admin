<!--
 * @desc EditInput
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 15:31:57
 -->
<template>
    <div class="edit-input">
        <p class="content" v-if="!editMode">
            {{ value }}
            <Button class="edit-btn" type="text" size="large" @click="editMode = true">
                <Icon class="icon" type="ios-create-outline"></Icon>
            </Button>
        </p>
        <Input v-bind="$attrs" v-model="val" v-on="$listeners" v-else></Input>
        <div class="action" v-if="editMode">
            <Button type="text" @click="sumit">确定</Button>
            <Button type="text" @click="cancel">取消</Button>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
