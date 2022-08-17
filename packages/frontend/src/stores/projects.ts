import { defineStore } from 'pinia'

export interface Project {
	id: number
	name: string
	key: string
	show?: boolean
}

export const useProjectsStore = defineStore('projects', {
	state: () => ({
		projects: [
			{
				id: 1,
				name: 'Test project 1',
				key: 'asjdaisjid',
			},
			{
				id: 2,
				name: 'Test project 2',
				key: 'ajiodasiodjio',
			},
		] as Project[],
		choose: -1, // -1 表示选中所有项目，其他值表示 projects 数组中的索引
	}),
	getters: {
		currentName(state) {
			if (this.choose === -1) {
				return '所有项目'
			}
			return state.projects[state.choose].name
		},
	},
	actions: {
		setCurrentProj(index: number) {
			if (index >= 0 && index < this.projects.length) {
				this.choose = index
			}
		},
	},
})
