<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
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
const JSoption = ref({
	title: {
		text: 'JS错误',
		subtext: 'JS Exception',
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
})
const InterfaceOption = ref({
	title: {
		text: '接口错误',
		subtext: 'Resource Exception',
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
})

const StaticOption = ref({
	title: {
		text: '静态资源错误',
		subtext: 'Fetch Exception',
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
})

const CustomOption = ref({
	title: {
		text: '自定义错误',
		subtext: 'Promise Exception',
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
})
const tableData = ref([] as any[])
let id = 3
// const id = projectsStore.projects[projectsStore.choose].id

const limit = 10

async function Eget(id: number, limit: number) {
	for (let index = 0; index < 4; index++) {
		const type = index + 1
		const result: ResponseResult = await axios.get('/exception', { params: { id, type, limit } })
		if (result.data) {
			dataExceptionType.value.series[0].data[index].value = result.data.length
			if (type === 1) {
				for (let j = 0; j < result.data.length; j++) {
					const inDay: number = new Date(result.data[j].time).getDay()
					JSoption.value.series[0].data[inDay] = JSoption.value.series[0].data[inDay] + 1
				}
			} else
			if (type === 2) {
				for (let j = 0; j < result.data.length; j++) {
					const inDay: number = new Date(result.data[j].time).getDay()
					InterfaceOption.value.series[0].data[inDay] = InterfaceOption.value.series[0].data[inDay] + 1
				}
			} else
			if (type === 3) {
				for (let j = 0; j < result.data.length; j++) {
					const inDay: number = new Date(result.data[j].time).getDay()
					StaticOption.value.series[0].data[inDay] = StaticOption.value.series[0].data[inDay] + 1
				}
			} else
			if (type === 4) {
				for (let j = 0; j < result.data.length; j++) {
					const inDay: number = new Date(result.data[j].time).getDay()
					CustomOption.value.series[0].data[inDay] = CustomOption.value.series[0].data[inDay] + 1
				}
			}
			for (let i = 0; i < result.data.length; i++) {
				const table = {
					tiem: result.data[i].time,
					data: result.data[i].msg,
					ip: result.data[i].position,
				}
				tableData.value.push(table)
			}
		} else {
			dataExceptionType.value.series[0].data[index].value = 0
			for (let index = 0; index < JSoption.value.series[0].data.length; index++) {
				JSoption.value.series[0].data[index] = 0
			}
			for (let index = 0; index < JSoption.value.series[0].data.length; index++) {
				InterfaceOption.value.series[0].data[index] = 0
			}
			for (let index = 0; index < JSoption.value.series[0].data.length; index++) {
				StaticOption.value.series[0].data[index] = 0
			}
			for (let index = 0; index < JSoption.value.series[0].data.length; index++) {
				CustomOption.value.series[0].data[index] = 0
			}
			tableData.value = []
		}
		// const Ereq: ResponseResult = await axios.get('/exception/recent', { params: { id, type } })
		// for (let index = 0; index < Ereq.data.length; index++) {
		// 	const table = {
		// 		date: result.data[index].time,
		// 		name: result.data[index].msg,
		// 		address: result.data[index].position,
		// 	}
		// 	tableData.value.push(table)
		// }
	}
}

onMounted(() => {
	Eget(id, limit)
	watch(() => projectsStore.choose, (newVal, oldVal) => {
		if (newVal !== -1) {
			id = projectsStore.projects[projectsStore.choose].id
			Eget(id, limit)
		}
	})
})
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
					<template #header>
						<div class="card-header">
							<span>异常列表</span>
						</div>
					</template>
					<el-table
						:data="tableData"
						height="300"
						style="width: 100%"
					>
						<el-table-column
							prop="tiem"
							label="Time"
							width="250"
						/>
						<el-table-column
							prop="data"
							label="Data"
						/>
						<el-table-column
							prop="ip"
							label="IP"
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
