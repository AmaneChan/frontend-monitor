<script lang="ts" setup>
import { onMounted } from 'vue'
import type { ResponseResult } from '../request.js'
import { axios } from '../request.js'
import { useProjectsStore } from '../stores/projects'
import HeadMenu from './Home/HeadMenu.vue'
import SideMenu from './Home/SideMenu.vue'

const projectStore = useProjectsStore()

onMounted(() => {
	projectStore.updateProjects()
})
</script>

<template>
	<HeadMenu></HeadMenu>
	<el-row>
		<el-col :span="3">
			<SideMenu class="side"></SideMenu>
		</el-col>
		<el-col
			:span="21"
			class="dataViewer"
		>
			<RouterView v-slot=" { Component } ">
				<KeepAlive>
					<Suspense>
						<component :is="Component"></component>
					</Suspense>
				</KeepAlive>
			</RouterView>
		</el-col>
	</el-row>
</template>

<style scoped>
.dataViewer {
	height: var(--viewer-height);
	overflow: auto;
}

.side {
	height: var(--viewer-height);
}
</style>

<style>
:root {
	--viewer-height: calc(100vh - var(--el-menu-item-height) - 3px);
}
</style>
