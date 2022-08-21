<script lang="ts" setup>
import VChart from 'vue-echarts'
import { onActivated, onMounted, reactive, ref, watch } from 'vue'
import router from '../../router'
import type { ResponseResult } from '../../request.js'
import { axios } from '../../request.js'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const Page = reactive({
	FP: 0,
	FCP: 0,
	DOM_Ready: 0,
	DOM_Complete: 0,
	DOM_Interactive: 0,
	LCP: 0,
})

const FPOption = ref({
	title: {
		text: 'FP分段数量占比',
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
				{ value: 0, name: '<100ms' },
				{ value: 0, name: '100-300ms' },
				{ value: 0, name: '300-500ms' },
				{ value: 0, name: '500-1000ms' },
				{ value: 0, name: '>1000ms' },
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
const FCPOption = ref({
	title: {
		text: 'FCP分段数量占比',
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
				{ value: 0, name: '<100ms' },
				{ value: 0, name: '100-300ms' },
				{ value: 0, name: '300-500ms' },
				{ value: 0, name: '500-1000ms' },
				{ value: 0, name: '>1000ms' },
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
const InteractiveOption = ref({
	title: {
		text: 'DOM_Interactive分段数量占比',
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
				{ value: 0, name: '<500ms' },
				{ value: 0, name: '500-1000ms' },
				{ value: 0, name: '1000-2000ms' },
				{ value: 0, name: '2000-5000ms' },
				{ value: 0, name: '>5000ms' },
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
const LCPOption = ref({
	title: {
		text: 'LCP分段数量占比',
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
				{ value: 0, name: '<200ms' },
				{ value: 0, name: '200-500ms' },
				{ value: 0, name: '500-1000ms' },
				{ value: 0, name: '>1000ms' },
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

const value = ref('tableDataFP')

const tableDataFP = ref<Perf[]>([])
const tableDataFCP = ref<Perf[]>([])
const tableDataReady = ref<Perf[]>([])
const tableDataComplete = ref<Perf[]>([])
const tableDataInteractive = ref<Perf[]>([])
const tableDataLCP = ref<Perf[]>([])

const curTableData = ref<Perf[]>([])
const map: any = { tableDataFP, tableDataFCP, tableDataReady, tableDataComplete, tableDataInteractive, tableDataLCP }

function switchPerfRank(name: string) {
	curTableData.value = map[name].value
}

interface Perf {
	from: string
	value: any
}

const options = [
	{
		value: 'tableDataFP',
		label: 'FP性能排行',
	},
	{
		value: 'tableDataFCP',
		label: 'FCP性能排行',
	},
	{
		value: 'tableDataReady',
		label: 'DOM_Ready性能排行',
	},
	{
		value: 'tableDataComplete',
		label: 'DOM_Complete性能排行',
	},
	{
		value: 'tableDataInteractive',
		label: 'DOM_Interactive性能排行',
	},
	{
		value: 'tableDataLCP',
		label: 'LCP性能排行',
	},
]

const add = function () {
	router.push('setting')
}
let id = -1
const limit = 10
const page = 0
const day = 7
async function Pget() {
	if (id === 0) {
		return
	}
	for (let index = 0; index < 7; index++) {
		const type = index + 1
		if (type === 4) {
			continue
		}
		const result: ResponseResult = await axios.get('/perf', { params: { id, type, page, limit } })
		if (result.data) {
			if (type === 1) {
				for (let i = 0; i < result.data.list.length; i++) {
					const pfm = {
						from: result.data.list[i].from,
						value: result.data.list[i].value,
					}
					tableDataFP.value.push(pfm)
				}
				Page.FP = result.data.avg
				const seg = '100,300,500,1000'
				const FPSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
				for (let i = 0; i < FPSeries.data.length; i++) {
					FPOption.value.series[0].data[i].value = FPSeries.data ? FPSeries.data[i] : 0
				}
			} else
			if (type === 2) {
				for (let i = 0; i < result.data.list.length; i++) {
					const pfm = {
						from: result.data.list[i].from,
						value: result.data.list[i].value,
					}
					tableDataFCP.value.push(pfm)
				}
				Page.FCP = result.data.avg
				const seg = '100,300,500,1000'
				const FCPSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
				for (let i = 0; i < FCPSeries.data.length; i++) {
					FCPOption.value.series[0].data[i].value = FCPSeries.data ? FCPSeries.data[i] : 0
				}
			} else
			if (type === 3) {
				for (let i = 0; i < result.data.list.length; i++) {
					const pfm = {
						from: result.data.list[i].from,
						value: result.data.list[i].value,
					}
					tableDataReady.value.push(pfm)
				}
				Page.DOM_Ready = result.data.avg
				console.log(Page.DOM_Ready)
			} else
			if (type === 5) {
				for (let i = 0; i < result.data.list.length; i++) {
					const pfm = {
						from: result.data.list[i].from,
						value: result.data.list[i].value,
					}
					tableDataComplete.value.push(pfm)
				}
				Page.DOM_Complete = result.data.avg
			} else
			if (type === 6) {
				for (let i = 0; i < result.data.list.length; i++) {
					const pfm = {
						from: result.data.list[i].from,
						value: result.data.list[i].value,
					}
					tableDataInteractive.value.push(pfm)
				}
				Page.DOM_Interactive = result.data.avg
				const seg = '500,1000,2000,5000'
				const InteractiveSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
				for (let i = 0; i < InteractiveSeries.data.length; i++) {
					InteractiveOption.value.series[0].data[i].value = InteractiveSeries.data ? InteractiveSeries.data[i] : 0
				}
			} else
			if (type === 7) {
				for (let i = 0; i < result.data.list.length; i++) {
					const pfm = {
						from: result.data.list[i].from,
						value: result.data.list[i].value,
					}
					tableDataLCP.value.push(pfm)
				}
				Page.LCP = result.data.avg
				const seg = '200,500,1000'
				const LCPSeries = await axios.get('/perf/seg', { params: { id, type, day, seg } })
				for (let i = 0; i < LCPSeries.data.length; i++) {
					LCPOption.value.series[0].data[i].value = LCPSeries.data ? LCPSeries.data[i] : 0
				}
			}
		}
	}
}

onMounted(() => {
	watch(
		() => projectsStore.choose,
		(newVal, oldVal) => {
			if (newVal !== -1) {
				Page.FP = 0
				Page.FCP = 0
				Page.DOM_Ready = 0
				Page.DOM_Complete = 0
				Page.DOM_Interactive = 0
				Page.LCP = 0
				tableDataComplete.value = []
				tableDataInteractive.value = []
				tableDataLCP.value = []
				FPOption.value.series[0].data = [{ value: 0, name: '<100ms' }, { value: 0, name: '100-300ms' }, { value: 0, name: '300-500ms' }, { value: 0, name: '500-1000ms' }, { value: 0, name: '>1000ms' }]
				FCPOption.value.series[0].data = [{ value: 0, name: '<100ms' }, { value: 0, name: '100-300ms' }, { value: 0, name: '300-500ms' }, { value: 0, name: '500-1000ms' }, { value: 0, name: '>1000ms' }]
				InteractiveOption.value.series[0].data = [{ value: 0, name: '<500ms' }, { value: 0, name: '500-1000ms' }, { value: 0, name: '1000-2000ms' }, { value: 0, name: '2000-5000ms' }, { value: 0, name: '>5000ms' }]
				LCPOption.value.series[0].data = [{ value: 0, name: '<200ms' }, { value: 0, name: '200-500ms' }, { value: 0, name: '500-1000ms' }, { value: 0, name: '>1000ms' }]
				id = projectsStore.projects[projectsStore.choose].id
				Pget()
			}
		},
	)
	switchPerfRank('tableDataFP')
})
onActivated(() => {
	console.log('onActivated')
	if (projectsStore.choose !== -1) {
		id = projectsStore.projects[projectsStore.choose].id
		Pget()
	}
})
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
			<div class="title">
				页面性能
			</div>
			<el-row>
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
			</el-row>
		</div>
		<div class="ma">
			<el-row>
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
		</div>
		<div class="ma">
			<el-row>
				<el-col :span="12">
					<el-card class="mal">
						<VChart
							class="chart"
							:option="FPOption"
							:autoresize="true"
						></VChart>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card class="mal">
						<VChart
							class="chart"
							:option="FCPOption"
							:autoresize="true"
						></VChart>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="ma">
			<el-row>
				<el-col :span="12">
					<el-card class="mal">
						<VChart
							class="chart"
							:option="InteractiveOption"
							:autoresize="true"
						></VChart>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card class="mal">
						<VChart
							class="chart"
							:option="LCPOption"
							:autoresize="true"
						></VChart>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<!-- e -->
		<div class="ma">
			<el-row>
				<el-col :span="24">
					<el-card class="mal">
						<el-select
							v-model="value"
							placeholder="Select"
							@change="switchPerfRank"
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
						<el-table
							:data="curTableData"
							height="300"
							style="width: 100%"
						>
							<el-table-column
								prop="from"
								label="页面 URL"
							/>
							<el-table-column
								prop="value"
								label="值"
								width="180"
							/>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style scoped>
.title {
	font-weight: 700;
	font-size: 1.2rem;
	margin: 1rem 0;
}

.ma {
	margin: 1rem;
}

.mal {
	margin-right: 0.5rem;
}

.fs {
	font-size: 2rem;
}

.chart {
	height: 300px;
}
</style>
