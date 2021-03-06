import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/gaithome'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '主界面' }
                },
                {
                    path: '/gaithome',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/GaitHome.vue'),
                    meta: { title: '步态主界面' }
                },
                {
                    path: '/silhouette',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/silhouette.vue'),
                    meta: { title: 'silhouette' }
                },
                {
                    path: '/gaitComparison',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/gaitComparison.vue'),
                    meta: { title: '步态比对' }
                },
                {
                    path: '/frameExtract',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/FrameExtract.vue'),
                    meta: { title: '视频帧提取' }
                },
                {
                    path: '/gaitSearch',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/GaitSearch.vue'),
                    meta: { title: '步态检索' }
                },
                {
                    path: '/reid',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/ReID.vue'),
                    meta: { title: '行人提取' }
                },
                {
                    path: '/gaitInDatabase',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/GaitInDatabase.vue'),
                    meta: { title: '步态入库' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});


// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: require('@/components/index').default
//     },
//     {
//       path: '/help',
//       name: 'landing-page',
//       component: require('@/components/LandingPage').default
//     },
//     {
//       path: '*',
//       redirect: '/'
//     }
//   ]
// })
