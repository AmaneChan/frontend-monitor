import { createRouter, createWebHistory } from 'vue-router'

import Entry from '../view/Entry.vue'
import Home from '../view/Home.vue'

import overview from '../view/Overview.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
			redirect: 'overview',
			children: [
				{
					path: 'overview',
					component: overview,
				},
			],
		},
		{
			path: '/entry',
			component: Entry,
		},
	],
})

export default router
