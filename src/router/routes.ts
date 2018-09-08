import { RouteConfig } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Dashboard from '@/views/Dashboard/index.vue'
import Error from '@/views/Error/index.vue'

export default [
    {
        path: '',
        redirect: {
            name: 'Dashboard',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: '仪表盘',
            icon: 'md-stats',
            menu: true,
        },
    },
    {
        path: '/articles',
        name: 'Article',
        component: () => import('@/views/Article/index.vue'),
        meta: {
            title: '文章管理',
            icon: 'md-book',
            menu: true,
        },
    },
    {
        path: '/articles/create',
        name: 'ArticleCreate',
        component: () => import('@/views/Article/children/Detail/index.vue'),
        meta: {
            title: '文章创建',
            icon: 'md-create',
        },
    },
    {
        path: '/articles/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/Article/children/Detail/index.vue'),
        meta: {
            title: '文章详情',
            icon: 'md-apps',
        },
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/Category/index.vue'),
        meta: {
            title: '分类管理',
            icon: 'md-filing',
            menu: true,
        },
    },
    {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/Tag/index.vue'),
        meta: {
            title: '标签管理',
            icon: 'md-bookmark',
            menu: true,
        },
    },
    {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/views/Comment/index.vue'),
        meta: {
            title: '评论管理',
            icon: 'md-text',
            menu: true,
        },
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User/index.vue'),
        meta: {
            title: '用户管理',
            icon: 'md-contact',
            menu: true,
        },
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting/index.vue'),
        meta: {
            title: '配置管理',
            icon: 'md-settings',
            menu: true,
        },
    },
    {
        path: '/notification',
        name: 'Notification',
        component: () => import('@/views/Notification/index.vue'),
        meta: {
            title: '通告管理',
            icon: 'md-notifications'
        },
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('@/views/Auth/index.vue'),
        meta: {
            title: '个人信息',
            icon: 'md-person',
        },
    },
    {
        name: 'Error',
        path: '/error/:errorCode',
        component: Error,
    },
    {
        name: 'Page404',
        path: '*',
        redirect: {
            path: '/error/404',
        },
    },
] as RouteConfig[]
