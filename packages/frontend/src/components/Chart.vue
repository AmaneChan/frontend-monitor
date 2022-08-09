<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import ElementResize from 'element-resize-detector'
const props = defineProps(['value', 'option', 'wid', 'hei'])

// var dt = new Date();
// console.log(dt.getTime());
// const id = ref(dt.getTime()+'')
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
		<div :id="id"></div>
	</div>
</template>

<style></style>
