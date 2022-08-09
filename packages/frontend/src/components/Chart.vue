<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['value', 'option', 'width', 'height'])

const id = ref(props.value)

onMounted(() => {
	const dom = document.getElementById(id.value)

	if (dom) {
		const myChart = echarts.init(dom)
		myChart.setOption(props.option)
	}
})
</script>

<template>
	<div>
		<div
			:style="{ height: props.height || '300px', width: props.width || '100%' }"
			:id="id"
		></div>
	</div>
</template>

<style></style>
