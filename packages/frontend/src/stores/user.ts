import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
	state: () => ({
		username: '',
		token: '',
	}),
	getters: {
		tokenAuth(): string {
			return `Bearer ${this.token}`
		},
	},
	actions: {
		logout() {
			this.token = ''
			this.username = ''
		},
	},
})
