import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../view/Home.vue'

import overview from '../view/Overview.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomeVue,
			redirect: 'overview',
			children: [
				{
					path: 'overview',
					component: overview,
				},
			],
		},
	],
})

export default router
