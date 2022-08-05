<template>
	<div>
		<div :id="id" class="echats"></div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['value', 'option'])

const id = ref(props.value)
const ins = getCurrentInstance()
onMounted(() => {
	console.log(id.value)
	const dom = document.getElementById(id.value)
	if (dom) {
		const myChart = echarts.init(dom)
		myChart.setOption(props.option)
		console.log(props)
	}
})
</script>

<style>
.echats {
	height: 300px;
	width: 100%;
}
</style>
