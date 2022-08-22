<script lang="ts" setup>
import { onActivated, onMounted, reactive, ref, watch } from 'vue'
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
				{ value: 0, name: 'JavaScript 异常' },
				{ value: 0, name: 'Promise 异常' },
				{ value: 0, name: 'Fetch 异常' },
				{ value: 0, name: '资源异常' },
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
		text: 'PV 变化趋势',
		subtext: 'PV',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', 'Yesterday', 'Today'],
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
		text: 'UV 变化趋势',
		subtext: 'UV',
		left: 'center',
	},
	xAxis: {
		type: 'category',
		data: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', 'Yesterday', 'Today'],
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
	FP: 0,
	FCP: 0,
	DOM_Ready: 0,
	DOM_Complete: 0,
	DOM_Interactive: 0,
	LCP: 0,
})
let id = -1
const limit = 10
const list = 1
async function Eget(id: number, limit: number) {
	for (let index = 0; index < 4; index++) {
		const type = index + 1
		const result: ResponseResult = await axios.get('/exception', { params: { id, type, limit } })
		if (result.data) {
			dataExceptionType.value.series[0].data[index].value = result.data.length
			for (let i = 0; i < result.data.length; i++) {
				const table = {
					time: new Date(result.data[i].time).toLocaleString(),
					data: result.data[i].msg,
					ip: result.data[i].position,
				}
				tableData.value.push(table)
			}
		}
	}
}
async function Bget(id: number) {
	const pvreq = await axios.get(`/behavior/visit/pv?id=${id}`)
	if (pvreq.data) {
		for (let index = 0; index < pvreq.data.length; index++) {
			pvOption.value.series[0].data[index] = pvreq.data[index]
		}
	}

	const uvreq = await axios.get(`/behavior/visit/uv?id=${id}`)

	for (let index = 0; index < uvreq.data.length; index++) {
		uvOption.value.series[0].data[index] = uvreq.data[index]
	}

	const pvtable = await axios.get(`/behavior/popular/pv?id=${id}`)
	if (pvtable.data) {
		for (let o = 0; o < pvtable.data.length; o++) {
			const table = {
				pv: pvtable.data[o].pv,
				from: pvtable.data[o].from,
			}
			pvtableData.value.push(table)
		}
	}
	const uvtable = await axios.get(`/behavior/popular/uv?id=${id}`)
	if (uvtable.data) {
		for (let o = 0; o < uvtable.data.length; o++) {
			const table = {
				uv: uvtable.data[o].uv,
				from: uvtable.data[o].from,
			}
			uvtableData.value.push(table)
		}
	}
}
async function BPet(page: number, day: number) {
	for (let index = 0; index < 7; index++) {
		const type = index + 1
		if (type === 4) {
			continue
		}
		const result: ResponseResult = await axios.get('/perf', { params: { id, type, page, limit } })
		if (result.data) {
			if (type === 1) {
				Page.FP = result.data.avg
			} else
			if (type === 2) {
				Page.FCP = result.data.avg
			} else
			if (type === 3) {
				Page.DOM_Ready = result.data.avg
			} else
			if (type === 5) {
				Page.DOM_Complete = result.data.avg
			} else
			if (type === 6) {
				Page.DOM_Interactive = result.data.avg
			} else
			if (type === 7) {
				Page.LCP = result.data.avg
			}
		} else {
			if (type === 1) {
				Page.FP = 0
			} else
			if (type === 2) {
				Page.FCP = 0
			} else
			if (type === 3) {
				Page.DOM_Ready = 0
			} else
			if (type === 5) {
				Page.DOM_Complete = 0
			} else
			if (type === 6) {
				Page.DOM_Interactive = 0
			} else
			if (type === 7) {
				Page.LCP = 0
			}
		}
	}
}
const page = 0
const day = 7
onMounted(() => {
	watch(
		() => projectsStore.choose,
		(newVal, oldVal) => {
			if (newVal !== -1) {
				dataExceptionType.value.series[0].data = [{ value: 0, name: 'JavaScript 异常' }, { value: 0, name: 'Promise 异常' }, { value: 0, name: 'Fetch 异常' }, { value: 0, name: '资源异常' }]
				tableData.value = []
				pvOption.value.series[0].data = [0, 0, 0, 0, 0, 0, 0]
				uvOption.value.series[0].data = [0, 0, 0, 0, 0, 0, 0]
				pvtableData.value = []
				uvtableData.value = []
				id = projectsStore.projects[projectsStore.choose].id
				Eget(id, limit)
				Bget(id)
				BPet(page, day)
			}
		},
	)
})
onActivated(() => {
	console.log('onActivated')
	console.log(projectsStore.choose)
	if (projectsStore.choose !== -1) {
		id = projectsStore.projects[projectsStore.choose].id
		dataExceptionType.value.series[0].data = [{ value: 0, name: 'JavaScript 异常' }, { value: 0, name: 'Promise 异常' }, { value: 0, name: 'Fetch 异常' }, { value: 0, name: '资源异常' }]
		tableData.value = []
		pvOption.value.series[0].data = [0, 0, 0, 0, 0, 0, 0]
		uvOption.value.series[0].data = [0, 0, 0, 0, 0, 0, 0]
		pvtableData.value = []
		uvtableData.value = []
		Eget(id, limit)
		Bget(id)
		BPet(page, day)
	}
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
		<div class="ma">
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<span>平均 FP</span>
						<br />
						<b class="fs">{{ Page.FP.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>平均 FCP</span>
						<br />
						<b class="fs">{{ Page.FCP.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>平均 DOM Ready</span>
						<br />
						<b class="fs">{{ Page.DOM_Ready.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="ma">
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<span>平均 DOM Complete</span>
						<br />
						<b class="fs">{{ Page.DOM_Complete.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>平均 DOM Interactive</span>
						<br />
						<b class="fs">{{ Page.DOM_Interactive.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>平均 LCP</span>
						<br />
						<b class="fs">{{ Page.LCP.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
			</el-row>
		</div>
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
							prop="time"
							label="触发时间"
							width="160"
						/>
						<el-table-column
							prop="data"
							label="异常信息"
						/>
						<el-table-column
							prop="ip"
							label="来源 URL"
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
.ma {
	margin: 1rem;
}

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
