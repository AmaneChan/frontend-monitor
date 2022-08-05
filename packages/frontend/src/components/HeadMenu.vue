<template>
	<div>
		<el-menu
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal"
			:ellipsis="false"
		>
			<div class="title">前端监控系统</div>
			<div class="flex-grow" />
			<el-menu-item index="1">主页</el-menu-item>
			<el-sub-menu index="2">
				<template #title>我的</template>
				<el-menu-item index="2-1">账号管理</el-menu-item>
				<el-sub-menu index="2-4">
					<template #title>项目切换</template>
					<el-menu-item index="2-4-1">item one</el-menu-item>
					<el-menu-item index="2-4-2">item two</el-menu-item>
					<el-menu-item index="2-4-3">item three</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>

<style>
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
