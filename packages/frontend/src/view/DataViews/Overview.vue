<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import VChart from 'vue-echarts'
import router from '../../router'
import { useProjectsStore } from '../../stores/projects'
import type { ResponseResult } from '../../request.js'
import { axios } from '../../request.js'
const tableData = ref([] as any[])
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
const pvOption = ref({
	title: {
		text: 'PV变化趋势',
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
			data: [0, 0, 0, 0, 0, 0, 0],
			type: 'line',
		},
	],
})
const pvtableData = ref([] as any[])
const uvOption = ref({
	title: {
		text: 'UV变化趋势',
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
			data: [0, 0, 0, 0, 0, 0, 0],
			type: 'line',
		},
	],
})
const uvtableData = ref([] as any[])
const Page = reactive({
	FP: 158.91,
	FCP: 1.52,
	DOM_Ready: 1.2,
	DOM_Complete: 2,
	DOM_Interactive: 1,
	LCP: 3,
})
const id = 3
const limit = 10
const list = 1
async function Eget(id: number, limit: number) {
	for (let index = 0; index < 4; index++) {
		const type = index + 1
		const result: ResponseResult = await axios.get('/exception', { params: { id, type, limit } })
		dataExceptionType.value.series[0].data[index].value = result.data.length
		for (let i = 0; i < result.data.length; i++) {
			const table = {
				tiem: result.data[i].time,
				data: result.data[i].msg,
				ip: result.data[i].position,
			}
			tableData.value.push(table)
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
async function Bget(id: number) {
	const pvreq = await axios.get(`/behavior/visit/pv?id=${id}`)

	for (let index = 0; index < pvreq.data.length; index++) {
		pvOption.value.series[0].data[index] = pvreq.data[index]
	}

	const uvreq = await axios.get(`/behavior/visit/uv?id=${id}`)

	for (let index = 0; index < uvreq.data.length; index++) {
		uvOption.value.series[0].data[index] = uvreq.data[index]
	}

	const pvtable = await axios.get(`/behavior/popular/pv?id=${id}`)
	for (let o = 0; o < pvtable.data.length; o++) {
		const table = {
			pv: pvtable.data[o].pv,
			from: pvtable.data[o].from,
		}
		pvtableData.value.push(table)
	}
	const uvtable = await axios.get(`/behavior/popular/uv?id=${id}`)
	for (let o = 0; o < uvtable.data.length; o++) {
		const table = {
			uv: uvtable.data[o].uv,
			from: uvtable.data[o].from,
		}
		uvtableData.value.push(table)
	}
}
async function BPet(page: number, day: number) {
	for (let index = 0; index < 7; index++) {
		const type = index + 1
		const result: ResponseResult = await axios.get('/perf', { params: { id, type, page, limit } })
		console.log(result)
		if (type === 1) {
			Page.FP = result.data.avg
			const seg = '100,300,500,1000'
			const FPSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
			console.log(FPSeries)
		} else
		if (type === 2) {
			Page.FCP = result.data.avg
			const seg = '100,300,500,1000'
			const FCPSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
			console.log(FCPSeries)
		} else
		if (type === 6) {
			Page.DOM_Interactive = result.data.avg
			const seg = '500,1000,2000,5000'
			const InteractiveSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
		} else
		if (type === 7) {
			Page.LCP = result.data.avg
			const seg = '200,500,1000'
			const LCPSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
		}
	}
}
const page = 0
const day = 7
onMounted(() => {
	Eget(id, limit)
	Bget(id)
	BPet(page, day)
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
	<div v-else>
		<el-row class="box-card">
			<el-col :span="8">
				<el-card class="mal">
					<span>平均FP</span>
					<br />
					<b class="fs">{{ Page.FP.toFixed(2) }}ms</b>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="mal">
					<span>平均FCP</span>
					<br />
					<b class="fs">{{ Page.FCP.toFixed(2) }}ms</b>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="mal">
					<span>平均DOM_Ready</span>
					<br />
					<b class="fs">{{ Page.DOM_Ready.toFixed(2) }}ms</b>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="mal">
					<span>平均DOM_Complete</span>
					<br />
					<b class="fs">{{ Page.DOM_Complete.toFixed(2) }}ms</b>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="mal">
					<span>平均DOM_Interactive</span>
					<br />
					<b class="fs">{{ Page.DOM_Interactive.toFixed(2) }}ms</b>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="mal">
					<span>平均LCP</span>
					<br />
					<b class="fs">{{ Page.LCP.toFixed(2) }}ms</b>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<VChart
						:option="dataExceptionType"
						class="chart"
						:autoresize="true"
					/>
				</el-card>
			</el-col>
			<el-col :span="24">
				<el-card class="box-card">
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
			<el-col :span="12">
				<el-card style="margin: 1rem;">
					<template #header>
						<div class="card-header">
							<span>热门页面(PV)</span>
						</div>
					</template>
					<el-table
						:data="pvtableData"
						style="width: 100%"
						height="240"
					>
						<el-table-column
							prop="pv"
							label="PV"
						/>
						<el-table-column
							prop="from"
							label="位置"
						/>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="margin: 1rem;">
					<VChart
						class="chart"
						:option="pvOption"
						:autoresize="true"
					></VChart>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="margin: 1rem;">
					<template #header>
						<div class="card-header">
							<span>热门页面(UV)</span>
						</div>
					</template>
					<el-table
						:data="uvtableData"
						style="width: 100%"
						height="240"
					>
						<el-table-column
							prop="uv"
							label="PV"
						/>
						<el-table-column
							prop="from"
							label="位置"
						/>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="margin: 1rem;">
					<VChart
						class="chart"
						:option="uvOption"
						:autoresize="true"
					></VChart>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
.box-card {
	margin: 1rem;
}
.chart {
	height: 300px;
}
.mal {
	margin-right: 0.5rem;
}
.fs {
	font-size: 2rem;
}
</style>
