<script lang="ts" setup></script>

<template>
	<div>
		<RouterView></RouterView>
	</div>
</template>

<script setup lang="ts">
import LoginRegister from './components/LoginRegister.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

body {
	margin: 0;
	padding: 0;

	font-family: 'Noto Sans SC', sans-serif;
}
</style>
