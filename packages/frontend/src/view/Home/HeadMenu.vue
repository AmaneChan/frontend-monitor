<script lang="ts" setup>
import { computed } from 'vue'
import type { MenuItemRegistered } from 'element-plus'

import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const chooseList = computed(() => {
	const list = projectsStore.projects.map(project => project.name)
	return list
})

const onMenuSelected = (menuItem: MenuItemRegistered) => {
	console.log(menuItem.index)
	projectsStore.choose = parseInt(menuItem.index)
}

const activeMenu = computed(() => {
	if (projectsStore.choose === -1) {
		return '0'
	}
	return projectsStore.choose.toString()
})
</script>

<template>
	<div>
		<el-menu
			:default-active="activeMenu"
			class="el-menu-demo"
			mode="horizontal"
			:ellipsis="false"
		>
			<div class="title">
				前端监控系统
			</div>
			<div class="flex-grow"></div>

			<el-sub-menu index="1">
				<template #title>
					当前项目:
					{{ projectsStore.currentName }}
				</template>
				<ElMenuItem
					v-for="(item, index) of chooseList"
					:key="item"
					:index="index.toString()"
					@click="(onMenuSelected)"
				>
					{{ item }}
				</ElMenuItem>
			</el-sub-menu>
		</el-menu>
	</div>
</template>

<style scoped>
.title {
	font-size: 1.15rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1.25rem;
	user-select: none;
}

.flex-grow {
	flex-grow: 1;
}
</style>
