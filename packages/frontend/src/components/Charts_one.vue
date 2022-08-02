<template>
	<div>
		<div id="Charts-one"></div>
	</div>
</template>

<script>
export default {
	name: 'Charts-one',
	mounted() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = this.$echarts.init(document.getElementById('Charts-one'))
		// 绘制图表
		myChart.setOption({
			title: {
				text: 'one',
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
#Charts-one {
	height: 300px;
	width: 100%;
}
</style>
