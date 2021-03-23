import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import App from './App'
import router from './router'
import store from './store'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import WebSocket from './WebSocket'
import db from './datastore'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


Vue.config.productionTip = false
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VueI18n);
Vue.use(ElementUI,{
  size: 'small'
})
Vue.use(VideoPlayer)

Vue.http = Vue.prototype.$http = axios
Vue.WebSocket = Vue.prototype.$WebSocket = WebSocket
Vue.prototype.$db = db


const i18n = new VueI18n({
  locale: 'zh',
  messages
});


document.title = `步态识别系统`;
/* eslint-disable no-new */
// new Vue({
//   components: { App },
//   router,
//   store,
//   template: '<App/>'
// }).$mount('#app')
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   // document.title = `${to.meta.title} | 步态识别系统`;
//   document.title = `步态识别系统`;
//   const role = localStorage.getItem('ms_username');
//   if (!role && to.path !== '/login') {
//       next('/login');
//   } else if (to.meta.permission) {
//       // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//       role === 'admin' ? next() : next('/403');
//   } else {
//       // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//       if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//           Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//               confirmButtonText: '确定'
//           });
//       } else {
//           next();
//       }
//   }
// });


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
