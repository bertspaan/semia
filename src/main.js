import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      name: 'main',
      path: '/',
      component: App
    },
    {
      name: 'about',
      path: '/about',
      component: App
    },
    {
      name: 'search',
      path: '/search',
      component: App
    },
    {
      name: 'video',
      path: '/video/:videoId',
      component: App
    },
    {
      name: 'shot',
      path: '/video/:videoId/shot/:shotId',
      component: App
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
