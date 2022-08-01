<template>
	<div>
		<div id="main"></div>
	</div>
</template>

<script>
export default {
	name: 'Charts-one',
	mounted() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = this.$echarts.init(document.getElementById('main'))
		// 绘制图表
		myChart.setOption({
			title: {
				text: 'xxx',
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: 'line',
				},
			],
		})
	},
}
</script>

<style>
#main {
	height: 20rem;
	width: 100%;
}
</style>
