<!--
 * @desc LimitSetting
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-09-11 23:35:32
 -->
<template>
    <div class="limit-setting">
        <Form :label-width="120">
            <FormItem label="每页文章数量">
                <Input v-model.trim="setting.limit.articleCount" style="max-width: 200px;" placeholder="每页文章数量">
                    <span slot="append">篇/页</span>
                </Input>
            </FormItem>
            <FormItem label="每页评论数量">
                <Input v-model.trim="setting.limit.commentCount" style="max-width: 200px;" placeholder="每页评论数量">
                    <span slot="append">条/页</span>
                </Input>
            </FormItem>
            <FormItem label="热门文章数量">
                <Input v-model.trim="setting.limit.hotArticleCount" style="max-width: 200px;" placeholder="热门文章数量">
                    <span slot="append">篇</span>
                </Input>
            </FormItem>
            <FormItem label="关联文章数量">
                <Input v-model.trim="setting.limit.relatedArticleCount" style="max-width: 200px;" placeholder="关联文章数量">
                    <span slot="append">篇</span>
                </Input>
            </FormItem>
            <FormItem label="垃圾评论判定阈值">
                <Input v-model.trim="setting.limit.commentSpamMaxCount" style="max-width: 200px;" placeholder="超过该阈值禁言用户">
                    <span slot="append">次</span>
                </Input>
            </FormItem>
            <FormItem label="说说数量">
                <Input v-model.trim="setting.limit.momentCount" style="max-width: 200px;" placeholder="说说数量">
                    <span slot="append">条</span>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
