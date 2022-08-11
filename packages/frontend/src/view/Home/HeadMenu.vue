<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1-1')
</script>

<template>
	<div>
		<el-menu
			:default-active="activeIndex"
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
					Project
				</template>
				<el-menu-item index="1-1">
					Project-1
				</el-menu-item>
				<el-menu-item index="1-2">
					Project-2
				</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="2">
				我的
			</el-menu-item>
		</el-menu>
	</div>
</template>

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
