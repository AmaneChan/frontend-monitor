import { createRouter, createWebHistory } from 'vue-router'

import Entry from '../view/Entry.vue'
import Home from '../view/Home.vue'

import Overview from '../view/DataViews/Overview.vue'
import Excpetion from '../view/DataViews/Exception.vue'
import Behavior from '../view/DataViews/Behavior.vue'
import Performance from '../view/DataViews/Performance.vue'
import Setting from '../view/DataViews/Setting.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'Home',
			path: '/',
			component: Home,
			redirect: 'overview',
			children: [
				{
					path: 'overview',
					component: Overview,
				},
				{
					path: 'exception',
					component: Excpetion,
				},
				{
					path: 'behavior',
					component: Behavior,
				},
				{
					path: 'performance',
					component: Performance,
				},
				{
					path: 'setting',
					component: Setting,
				},
			],
		},
		{
			name: 'Entry',
			path: '/entry',
			component: Entry,
		},
	],
})

router.beforeEach((to, _from) => {
	console.log('from', _from, 'to', to)
	if (to.name === 'Entry') {
		return true
	}
	console.log(localStorage.getItem('token') == null || localStorage.getItem('token') === '')
	if (
		localStorage.getItem('token') == null ||
		localStorage.getItem('token') === ''
	) {
		return 'Entry'
	}
})

export default router
