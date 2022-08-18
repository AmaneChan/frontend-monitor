<script lang="ts" setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import router from '../../router'
import { axios } from '../../request.js'
const token: string | null = `${localStorage.getItem('token')}`
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

const tableData = ref([] as any[])

const id = 1
const limit = 10

for (let index = 0; index < 4; index++) {
	const type = index + 1
	axios
		.get('/exception', {
			params: { id, type, limit },
			headers: { Authorization: token },
		})
		.then((res) => {
			console.log(res)
			dataExceptionType.value.series[0].data[index].value = res.data.length
			for (let i = 0; i < res.data.length; i++) {
				const table = {
					date: '2016-05-03',
					name: res.data[i].msg,
					address: res.data[i].position,
				}
				tableData.value.push(table)
			}
			console.log(tableData)
		})
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
const empty = false

const add = function () {
	router.push('setting')
}
</script>

<template>
	<div v-if="empty">
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
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						:option="dataExceptionType"
						class="chart"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<el-table
						:data="tableData"
						height="300"
						style="width: 100%"
					>
						<el-table-column
							prop="date"
							label="Date"
							width="180"
						/>
						<el-table-column
							prop="name"
							label="Name"
							width="180"
						/>
						<el-table-column
							prop="address"
							label="Address"
						/>
						<el-table-column
							prop="name"
							label="Name"
							width="180"
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
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="InterfaceOption"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="StaticOption"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="chartCard">
					<VChart
						class="chart"
						:option="CustomOption"
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
