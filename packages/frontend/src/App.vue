<template>
	<div>
		<head-menu></head-menu>
		<el-row>
			<el-col :span="3">
				<side-menu></side-menu>
			</el-col>

			<el-col :span="21">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setpu>
import { defineComponent, reactive, ref, toRefs, onMounted, Ref } from 'vue'
import HeadMenu from './components/HeadMenu.vue'
import SideMenu from './components/SideMenu.vue'

export default {
	name: 'App',
	components: {
		HeadMenu,
		SideMenu,
	},
	setup() {},
}
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
</style>
