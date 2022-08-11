<script lang="ts" setup>
import Chart from '../../components/Chart.vue'
const OverOption = {
	title: {
		text: '异常监控',
		subtext: 'Exception Monitoring',
		left: 'center',
	},
	tooltip: {
		trigger: 'item',
	},
	legend: {
		orient: 'vertical',
		left: 'left',
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: 'JS错误' },
				{ value: 735, name: '自定义异常' },
				{ value: 580, name: '静态资源异常' },
				{ value: 484, name: '接口异常' },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
}
const JSoption = {
	title: {
		text: 'JS错误',
		subtext: 'Fake Data',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [12, 32, 12, 32, 32, 4, 2],
			type: 'line',
		},
	],
}

const InterfaceOption = {
	title: {
		text: '接口错误',
		subtext: 'Fake Data',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [2, 4, 0, 12, 2, 12, 5],
			type: 'line',
		},
	],
}

const StaticOption = {
	title: {
		text: '静态资源错误',
		subtext: 'Fake Data',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [15, 23, 22, 21, 13, 14, 26],
			type: 'line',
		},
	],
}

const CustomOption = {
	title: {
		text: '自定义错误',
		subtext: 'Fake Data',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [10, 20, 24, 28, 15, 17, 20],
			type: 'line',
		},
	],
}

const DomId = {
	ExceptionOver: 'ExceptionOver',
	JSException: 'JSException',
	InterfaceException: 'InterfaceException',
	StaticException: 'StaticException',
	CustomException: 'CustomException',
}
</script>

<template>
	<div>
		<div class="ma">
			<el-card>
				<Chart :value="DomId.ExceptionOver" :option="OverOption"></Chart>
			</el-card>
		</div>

		<div class="ma">
			<el-row>
				<el-col :span="6">
					<el-card class="mal">
						<Chart :value="DomId.JSException" :option="JSoption"></Chart>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card class="mal">
						<Chart :value="DomId.InterfaceException" :option="InterfaceOption"></Chart>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card class="mal">
						<Chart :value="DomId.StaticException" :option="StaticOption"></Chart>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card class="mal">
						<Chart :value="DomId.CustomException" :option="CustomOption"></Chart>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style scoped>
.ma {
	margin: 1rem;
}
.mal {
	margin-right: 0.5rem;
}
</style>
