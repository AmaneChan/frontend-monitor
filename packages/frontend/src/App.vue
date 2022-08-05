<template>
	<div>
		<head-menu></head-menu>
		<el-row>
			<el-col :span="3">
				<SideMenu></SideMenu>
			</el-col>

			<el-col :span="21">
				<RouterView></RouterView>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import HeadMenu from './components/HeadMenu.vue'
import SideMenu from './components/SideMenu.vue'
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
</style>
