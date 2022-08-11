<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import ElementResize from 'element-resize-detector'

const props = defineProps(['value', 'option', 'width', 'height'])

// var dt = new Date();
// console.log(dt.getTime());
// const id = ref(dt.getTime()+'')
const id = ref(props.value)

onMounted(() => {
	const dom = document.getElementById(id.value)

	if (dom) {
		const myChart = echarts.init(dom)
		myChart.setOption(props.option)
		// 图表随父组件改变而改变
		const elementResize = ElementResize({
			strategy: 'scroll', // 推荐监听滚动，提升性能
			callOnAdd: true, // 添加侦听器时是否应调用,默认true
		})
		elementResize.listenTo(dom, (element) => {
			// 当元素尺寸发生改变是会触发此事件，刷新图表
			echarts.init(dom).resize()
		})
	}
})
</script>

<template>
	<div>
		<div
			:id="id"
			:style="{ height: props.height || '300px', width: props.width || '100%' }"
		></div>
	</div>
</template>

<style></style>
