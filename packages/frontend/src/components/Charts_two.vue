<template>
	<div>
		<div :id="id" class="echats"></div>
	</div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from 'vue'
import * as echarts from 'echarts'
export default {
	name: 'Charts-two',
	props: ['value', 'option'],
	setup(props) {
		let id = ref(props.value)
		const ins = getCurrentInstance()
		onMounted(() => {
			console.log(id.value)
			let dom = document.getElementById(id.value)
			let myChart = null;
			myChart = echarts.init(dom)
			myChart.setOption(props.option)
			console.log(props)
		})
		return {
			id,
		}
	},
}
</script>

<style>
.echats {
	height: 400px;
	width: 100%;
}
</style>
