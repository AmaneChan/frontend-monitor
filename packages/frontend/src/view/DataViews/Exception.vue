<script lang="ts" setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import router from '../../router'
import type { ResponseResult } from '../../request.js'
import { axios } from '../../request.js'

import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const dataExceptionType = ref({
	title: {
		text: '异常类型',
		subtext: 'Exception Type',
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
				{ value: 0, name: 'JS错误' },
				{ value: 0, name: '自定义异常' },
				{ value: 0, name: '静态资源异常' },
				{ value: 0, name: '接口异常' },
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
})
const JSoption = {
	title: {
		text: 'JS错误',
		subtext: 'Fake Data',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [0, 0, 0, 0, 0, 0, 0],
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
		data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [0, 0, 0, 0, 0, 0, 0],
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
		data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [0, 0, 0, 0, 0, 0, 0],
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
		data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [0, 0, 0, 0, 0, 0, 0],
			type: 'line',
		},
	],
}

const tableData = ref([] as any[])

const id = projectsStore.projects[projectsStore.choose].id
const limit = 10
for (let index = 0; index < 4; index++) {
	const type = index + 1
	const result: ResponseResult = await axios.get('/exception', { params: { id, type, limit } })
	dataExceptionType.value.series[0].data[index].value = result.data.length
	if (type === 1) {
		for (let j = 0; j < result.data.length; j++) {
			const inDay: number = new Date(result.data[j].time).getDay()
			JSoption.series[0].data[inDay] = JSoption.series[0].data[inDay] + 1
		}
	} else
	if (type === 2) {
		for (let j = 0; j < result.data.length; j++) {
			const inDay: number = new Date(result.data[j].time).getDay()
			InterfaceOption.series[0].data[inDay] = JSoption.series[0].data[inDay] + 1
		}
	} else
	if (type === 3) {
		for (let j = 0; j < result.data.length; j++) {
			const inDay: number = new Date(result.data[j].time).getDay()
			StaticOption.series[0].data[inDay] = JSoption.series[0].data[inDay] + 1
		}
	}
	if (type === 4) {
		for (let j = 0; j < result.data.length; j++) {
			const inDay: number = new Date(result.data[j].time).getDay()
			CustomOption.series[0].data[inDay] = JSoption.series[0].data[inDay] + 1
		}
	}
	for (let i = 0; i < result.data.length; i++) {
		const table = {
			date: result.data[i].time,
			name: result.data[i].msg,
			address: result.data[i].position,
		}
		tableData.value.push(table)
	}
	console.log(tableData)
}

const add = function () {
	router.push('setting')
}
</script>

<template>
	<div v-if="!projectsStore.hasProject">
		<el-empty :image-size="200" />
		<div style="width: 100%; text-align: center">
			<el-button
				type="primary"
				@click="add"
			>
				前去添加项目
			</el-button>
		</div>
	</div>
	<div
		v-else
		class="container"
	>
		<el-row>
			<el-col :span="24">
				<el-card class="chartCard">
					<VChart
						:option="dataExceptionType"
						class="chart"
						:autoresize="true"
					/>
				</el-card>
			</el-col>
			<el-col :span="24">
				<el-card class="chartCard">
					<el-table
						:data="tableData"
						height="300"
						style="width: 100%"
					>
						<el-table-column
							prop="date"
							label="Date"
							width="250"
						/>
						<el-table-column
							prop="name"
							label="Name"
						/>
						<el-table-column
							prop="address"
							label="Address"
							width="300"
						/>
					</el-table>
				</el-card>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="JSoption"
						:autoresize="true"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="InterfaceOption"
						:autoresize="true"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="StaticOption"
						:autoresize="true"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="CustomOption"
						:autoresize="true"
					/>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
.chartCard {
	margin: 0.5rem;
}

.container {
	padding: 0.5rem;
}
.chart {
	height: 300px;
}
</style>
