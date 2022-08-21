import { defineStore } from 'pinia'

import { ElMessage } from 'element-plus'
import { axios } from '../request.js'
import type { ResponseResult } from '../request.js'
import router from '../router/index.js'
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
			router.push('/entry')
		},
		async login(token: string) {
			localStorage.setItem('token', token)
			const result: ResponseResult = await axios.get('/user/info')
			if (result.code !== 200) {
				if (result.message.includes('认证')) {
					this.logout()
					return ElMessage.error('登录已过期，请重新登录')
				}
			}
			this.token = token
			this.id = result.data.id
			this.username = result.data.username
		},
	},
})
