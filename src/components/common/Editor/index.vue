<!--
 * @desc Editor
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-12-06 19:21:01
 -->
<template>
    <div class="editor">
        <i-editor v-model="content"
            ref="editor"
            affix
            paste
            v-bind="$attrs"
            :config="{ action: '' }"
            :before-upload="beforeUpload"></i-editor>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
