<!--
 * @desc Setting
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 13:53:56
 -->
<template>
    <Container class="setting-page" :title="$route.meta.title">
        <Avatar slot="logo" :icon="$route.meta.icon" style="color: #87e8de;background-color: #e6fffb"></Avatar>
        <Card>
            <div class="content">
                <Menu theme="light" :active-name="menu" class="setting-menu" @on-select="menuSelect">
                    <MenuItem name="site">
                        <Icon type="md-document" />
                        站内内容设置
                    </MenuItem>
                    <MenuItem name="links">
                        <Icon type="md-link" />
                        友链设置
                    </MenuItem>
                    <MenuItem name="keys">
                        <Icon type="md-key" />
                        Keys设置
                    </MenuItem>
                    <MenuItem name="limit">
                        <Icon type="md-cut" />
                        Limit设置
                    </MenuItem>
                </Menu>
                <div class="details">
                    <div class="keys" v-if="menu === 'site'">
                        <h2 class="label">站内内容设置</h2>
                        <SiteSetting></SiteSetting>
                    </div>
                    <div class="links" v-if="menu === 'links'">
                        <h2 class="label">友链配置</h2>
                        <LinkList></LinkList>
                    </div>
                    <div class="keys" v-if="menu === 'keys'">
                        <h2 class="label">Keys设置</h2>
                        <KeysSetting></KeysSetting>
                    </div>
                    <div class="keys" v-if="menu === 'limit'">
                        <h2 class="label">Limit设置</h2>
                        <LimitSetting></LimitSetting>
                    </div>
                </div>
            </div>
        </Card>
    </Container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
