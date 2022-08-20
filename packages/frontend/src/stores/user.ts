import { defineStore } from 'pinia'

import { axios } from '../request.js'
import type { ResponseResult } from '../request.js'
import { useProjectsStore } from './projects.js'

export const useUserStore = defineStore('userStore', {
	state: () => ({
		username: '',
		id: -1,
		token: '',
	}),
	getters: {
		tokenAuth(): string {
			return `Bearer ${this.token}`
		},
	},
	actions: {
		logout() {
			const projectStore = useProjectsStore()
			projectStore.refresh()
			this.token = ''
			this.username = ''
			localStorage.removeItem('token')
		},
		async login(token: string) {
			this.token = token
			localStorage.setItem('token', token)
			const result: ResponseResult = await axios.get('/user/info')
			this.id = result.data.id
			this.username = result.data.username
		},
	},
})
