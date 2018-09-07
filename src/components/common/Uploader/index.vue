<!--
 * @desc Uploader
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-08 00:30:16
 -->
<template>
    <div class="uploader">
        <Upload
            action=""
            :show-upload-list="false"
            accept="image/*"
            :before-upload="beforeUpload">
            <Button type="primary" icon="md-cloud-upload" size="small" :loading="uploading">{{ url ? '更换' : '上传' }}</Button>
        </Upload>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
