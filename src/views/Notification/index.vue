<!--
 * @desc Notification
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:29
 -->
<template>
    <Container class="notification-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: rgb(241,64,75);background-color: rgba(241,64,75, .2)"></Avatar>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
