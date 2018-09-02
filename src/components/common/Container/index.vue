<!--
 * @desc Container
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 01:14:02
 -->
<template>
    <div class="container">
        <div class="header" v-if="hasLogoSlots || log || hasTitleSlots || hasDescSlots || title || desc">
            <div class="logo" v-if="hasLogoSlots || logo">
                <Icon :type="logo" size="28" v-if="logo"></Icon>
                <slot name="logo" v-else></slot>
            </div>
            <div class="detail" v-if="hasTitleSlots || hasDescSlots || title || desc">
                <div class="row">
                    <h1 class="title" v-if="!hasTitleSlots && title">{{ title }}</h1>
                    <slot class="title" name="title" v-else></slot>
                    <div class="action" v-if="hasActionSlots">
                        <slot name="action"></slot>
                    </div>
                </div>
                <div class="row desc" v-if="hasDescSlots || desc">
                    <p v-if="desc">{{ desc </p>
                    <slot name="desc" v-else></slot>
                </div>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
