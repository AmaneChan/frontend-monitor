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
		let myChart = echarts.init(dom)
		myChart.setOption(props.option)
		//图表随父组件改变而改变
		var elementResize = ElementResize({
			strategy: 'scroll', //  推荐监听滚动，提升性能
			callOnAdd: true, // 添加侦听器时是否应调用,默认true
		})
		elementResize.listenTo(dom, function (element) {
			// 当元素尺寸发生改变是会触发此事件，刷新图表
			echarts.init(dom).resize()
		})
		//图表随浏览器窗口改变而改变
		// window.addEventListener("resize", function () {
		// 	myChart.resize();
		// });
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
