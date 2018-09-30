<!--
 * @desc SiteSetting
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-11 23:35:02
 -->
<template>
    <div class="site-setting">
        <Form :label-width="80">
            <FormItem label="Logo">
                <div class="logo">
                    <img :src="setting.site.logo" alt="logo" v-if="setting.site.logo">
                    <Uploader
                        type="image"
                        :name="config.UPLOAD_NAME.LOGO"
                        :url="setting.site.logo"
                        @on-success="uploadSuccess"></Uploader>
                </div>
            </FormItem>
            <FormItem label="欢迎语">
                <Input type="textarea"
                    v-model.trim="setting.site.welcome"
                    :auto-size="{ minRows: 2, maxRows: 6 }"
                    style="max-width: 60%;"
                    placeholder="站点欢迎语"></Input>
            </FormItem>
            <FormItem label="歌单ID">
                <Input v-model.trim="setting.site.musicId" style="max-width: 200px;" placeholder="网易云歌单ID"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
