import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    },
    children: [{
        path: '/chart',
        name: 'Chart',
        component: () => import('../views/Chart.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/study',
        name: 'study',
        component: () => import('../views/study.vue'),
        // meta: {
        //   keepAlive: true
        // }
      },
      {
        path: '/study2',
        name: 'study2',
        component: () => import('../views/study2.vue'),
      }

    ],
  },
  {
    path: '/echart',
    name: 'echat',
    component: () => import('../views/echart.vue')
  },
  {
    path: '/amap',
    name: 'Amap',
    component: () => import( /* webpackChunkName: "about" */ '../views/Amap.vue'),
    // meta: {
    //   keepAlive: true
    // }
  },


]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router