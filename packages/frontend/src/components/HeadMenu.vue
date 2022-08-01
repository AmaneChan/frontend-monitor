<template>
	<div>
		<el-menu
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal"
			:ellipsis="false"
			@select="handleSelect"
		>
			<el-menu-item index="0">LOGO</el-menu-item>
			<div class="flex-grow" />
			<el-menu-item index="1">Processing Center</el-menu-item>
			<el-sub-menu index="2">
				<template #title>Workspace</template>
				<el-menu-item index="2-1">item one</el-menu-item>
				<el-menu-item index="2-2">item two</el-menu-item>
				<el-menu-item index="2-3">item three</el-menu-item>
				<el-sub-menu index="2-4">
					<template #title>item four</template>
					<el-menu-item index="2-4-1">item one</el-menu-item>
					<el-menu-item index="2-4-2">item two</el-menu-item>
					<el-menu-item index="2-4-3">item three</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
	name: 'Menu',
	setup() {
		const activeIndex = ref('1')
        return {
            activeIndex,
        }
	},
}
</script>

<style>
.flex-grow {
	flex-grow: 1;
}
</style>
