<script lang="ts" setup>
import { onMounted } from 'vue'
import { useProjectsStore } from '../stores/projects'
import { useUserStore } from '../stores/user'
import HeadMenu from './Home/HeadMenu.vue'
import SideMenu from './Home/SideMenu.vue'

const projectStore = useProjectsStore()
const userStore = useUserStore()

onMounted(() => {
	const token = localStorage.getItem('token')
	if (token && !userStore.token) {
		userStore.login(token)
	}
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
