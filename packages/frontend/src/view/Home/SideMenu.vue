<script lang="ts" setup>
import { ref } from 'vue'
import { InfoFilled, Location, Setting, TrendCharts, User } from '@element-plus/icons-vue'
import router from '../../router'

let index = ref('/overview')
const IndexList = ['/overview', '/exception', '/behavior', '/performance', '/setting']
if (IndexList.includes(router.currentRoute.value.path)) {
	index = ref(router.currentRoute.value.path)
}
</script>

<template>
	<div>
		<el-menu
			:router="true"
			:default-active="router.currentRoute.value.path"
			class="menu"
		>
			<el-menu-item index="/overview">
				<el-icon><Location /></el-icon>
				<span>总览</span>
			</el-menu-item>
			<el-menu-item index="/exception">
				<el-icon><InfoFilled /></el-icon>
				<span>异常监控</span>
			</el-menu-item>
			<el-menu-item index="/behavior">
				<el-icon><User /></el-icon>
				<span>用户行为</span>
			</el-menu-item>
			<el-menu-item index="/performance">
				<el-icon><TrendCharts /></el-icon>
				<span>性能数据</span>
			</el-menu-item>
			<el-menu-item index="/setting">
				<el-icon><Setting /></el-icon>
				<span>账号设置</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<style scoped>
.menu {
	overflow: hidden;
	height: 100%;
}
</style>
