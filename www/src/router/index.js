import Vue from 'vue'
import Router from 'vue-router'
import Slap from '@/components/Slap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Slap',
      component: Slap
    }
  ]
})
