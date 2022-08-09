<script lang="ts" setup>
import { onMounted, getCurrentInstance, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['value', 'option', 'wid', 'hei'])

const id = ref(props.value)
onMounted(() => {
	const dom = document.getElementById(id.value)
	if (props.hei) {
		dom!.style.height = props.hei
	} else {
		dom!.style.height = '300px'
	}
	if (props.wid) {
		dom!.style.width = props.wid
	} else {
		dom!.style.width = '100%'
	}

	if (dom) {
		const myChart = echarts.init(dom)
		myChart.setOption(props.option)
	}
})
</script>

<template>
	<div>
		<div :id="id"></div>
	</div>
</template>

<style></style>
