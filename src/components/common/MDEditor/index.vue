<!--
 * @desc MDEditor
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-07 23:41:38
 -->
<template>
    <div class="md-editor" :class="classes">
        <div class="command" v-if="commands.length">
        <a class="command-item" :class="[`command-item-${item.key}`]"
            v-for="item in commands"
            :key="item.key"
            :title="item.title"
            @click.prevent="handleCommandClick(item)">
            <i class="iconfont" :class="[`icon-${item.key}`]"></i>
            <span v-if="item.text">{{ item.text }}</span>
        </a>
        </div>
        <div class="content" :style="contentStyle">
        <div class="edit-pane">
            <textarea class="edit-area" :value="value" ref="input" @input="handleValueChange"></textarea>
        </div>
        <transition name="fade">
            <div class="preview-pane md-body" v-html="previewContent" v-show="mode.preview"></div>
        </transition>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
