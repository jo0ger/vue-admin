<!--
 * @desc Default
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-02 15:04:29
 -->
<template>
    <Layout class="app-container">
        <Sider class="app-sider" hide-trigger collapsible :collapsed-width="78">
            <div class="profile">
                <div class="user">
                    <img class="avatar" :src="admin.avatar" alt="" srcset="">
                    <h2 class="name">{{ admin.name }}</h2>
                    <p class="slogan">{{ setting.personal && setting.personal.slogan }}</p>
                </div>
                <div class="action">
                    <router-link class="notification" :to="{ name: 'Notification' }">
                        <Badge :count="nPageInfo.total">
                            <Icon type="md-notifications" size="18" color="#fff"></Icon>
                        </Badge>
                    </router-link>
                    <router-link class="info" :to="{ name: 'Auth' }">
                        <Icon type="md-person" size="18" color="#fff" />
                    </router-link>
                    <a class="logout" @click="handleLogout">
                        <Icon type="md-log-out" size="18" color="#fff" />
                    </a>
                </div>
            </div>
            <Menu class="menu" :active-name="$route.name" theme="dark" width="auto" @on-select="menuClick">
                <template v-for="menu in routeMenus">
                    <Submenu class="menu-link" :name="menu.name" :key="menu.name" v-if="menu.children && menu.children.length">
                        <template slot="title">
                            <Icon :type="menu.meta.icon" v-if="menu.meta.icon"></Icon>
                            <span>{{ menu.meta.title }}</span>
                        </template>
                        <MenuItem class="sub-menu-link" :name="submenu.name" v-for="submenu in menu.children" :key="submenu.name">
                            <Icon :type="submenu.meta.icon" v-if="submenu.meta.icon"></Icon>
                            <span>{{ submenu.meta.title }}</span>
                        </MenuItem>
                    </Submenu>
                    <MenuItem class="menu-link" :name="menu.name" :key="menu.name" v-else>
                        <Icon :type="menu.meta.icon" v-if="menu.meta.icon"></Icon>
                        <span>{{ menu.meta.title }}</span>
                    </MenuItem>
                </template>
            </Menu>
        </Sider>
        <Layout style="overflow-y: auto; height: 100vh; position: relative;">
            <Content class="app-content">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>

<script lang="ts" src="./index.ts"></script>


<style lang="stylus" scoped src="./index.styl"></style>

