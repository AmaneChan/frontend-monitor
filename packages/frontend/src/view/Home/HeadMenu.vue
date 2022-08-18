<script lang="ts" setup>
import { computed, VueElement } from 'vue'
import type { MenuItemRegistered } from 'element-plus'

import { useProjectsStore } from '../../stores/projects'

const allProjects = '所有项目'

const projectsStore = useProjectsStore()

const chooseList = computed(() => {
	const list = projectsStore.projects.map(project => project.name)
	list.unshift(allProjects)
	return list
})

const onMenuSelected = (menuItem: MenuItemRegistered) => {
	console.log(menuItem.index)
	projectsStore.choose = parseInt(menuItem.index)
}

</script>

<template>
	<div>
		<el-menu
			default-active="-1"
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
					{{ projectsStore.choose === -1 ? allProjects : projectsStore.currentName }}
				</template>
				<ElMenuItem
					v-for="(item, index) of chooseList"
					:key="item"
					:index="(index === 0 ? -1 : index - 1).toString()"
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
