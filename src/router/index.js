import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
      path: '/',
      name: 'Home',
      redirect: '/map',
      component: Home
   },
   {
      path: '/map',
      name: 'Map',
      component: () => import('../views/Map.vue')
   },
   {
      path: '/zodiac',
      name: 'Zodiac',
      component: () => import('../views/Zodiac.vue')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router