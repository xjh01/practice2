import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
	children: [{
		path: 'members/collection',
		name: 'collection',
		component: () => import('../views/maincontent/members management/collection.vue')
	},{
		path: 'members/list',
		name: 'list',
		component: () => import('../views/maincontent/members management/list.vue')
	},{
		path: 'members/levels',
		name: 'level',
		component: () => import('../views/maincontent/members management/level.vue')
	},{
		path: 'members/rights',
		name: 'right',
		component: () => import('../views/maincontent/members management/rights.vue')
	},{
		path: 'members/integralrules',
		name: 'integral',
		component: () => import('../views/maincontent/members management/integralRules.vue')
	}]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
	path: '/login',
	name: 'login',
	component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
