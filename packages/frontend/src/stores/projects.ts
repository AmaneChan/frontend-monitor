import { defineStore } from 'pinia'
import type { ResponseResult } from '../request'
import { axios } from '../request'

export interface Project {
	id: number
	name: string
	key: string
	show?: boolean
}

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [] as Project[],
		choose: -1, // -1 表示还没有请求，其他值表示 projects 数组中的索引
	}),
	getters: {
		currentName(state) {
			if (this.choose === -1) {
				return ''
			}
			console.log(this.choose)
			return state.projects[state.choose].name
		},
		hasProject(): boolean {
			return this.projects && this.projects.length > 0
		},
	},
	actions: {
		setCurrentProj(index: number) { // 设置当前选中的项目
			if (index >= 0 && index < this.projects.length) {
				this.choose = index
			}
		},
		setProjects(projects: Project[]) {
			if (!projects) {
				return this.projects = []
			}
			this.projects = projects
			if (this.choose === -1) {
				this.choose = 0
			}
		},
		async updateProjects() {
			const result: ResponseResult = await axios.get('/project')
			this.setProjects(result.data)
		},
		refresh() {
			this.projects = []
			this.choose = -1
		},
	},
})
