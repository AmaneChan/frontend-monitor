<script lang="ts" setup>
import VChart from 'vue-echarts'
import { onMounted } from 'vue'
import router from '../../router'
import type { ResponseResult } from '../../request.js'
import { axios } from '../../request.js'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const Page = {
	FP: 158.91,
	FCP: 1.52,
	DOM_Ready: 1.2,
	DOM_Complete: 2,
	DOM_Interactive: 1,
	LCP: 3,
}
const Interface = {
	Sum: 156,
	Time: 124.22,
	SuccessRate: 100,
}
const FPOption = {
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
}
const FCPOption = {
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
}
const InteractiveOption = {
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
}
const LCPOption = {
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
}

const PageOption = {
	title: {
		text: '页面加载耗时分段数量占比',
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
				{ value: 1048, name: '<1秒' },
				{ value: 735, name: '1-5秒' },
				{ value: 580, name: '5-10秒' },
				{ value: 484, name: '10-30秒' },
				{ value: 300, name: '>30秒' },
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

const InterfaceOption = {
	title: {
		text: '接口请求耗时分段数量占比',
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
				{ value: 523, name: '<1秒' },
				{ value: 3, name: '1-5秒' },
				{ value: 0, name: '5-10秒' },
				{ value: 0, name: '10-30秒' },
				{ value: 0, name: '>30秒' },
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
const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
]

const add = function () {
	router.push('setting')
}
const id = 3
const limit = 10
const page = 0

for (let index = 0; index < 7; index++) {
	const type = index + 1
	await axios
		.get('/perf', {
			params: { id, type, page, limit },
		})
		.then((res) => {
			console.log(res)
			if (type === 1) {
				Page.FP = res.data.avg.toFixed(2)
				for (let i = 0; i < res.data.list.length; i++) {
					if (res.data.list[i].value <= 100) { FPOption.series[0].data[0].value++ } else if (res.data.list[i].value <= 300) { FPOption.series[0].data[1].value++ } else if (res.data.list[i].value <= 500) { FPOption.series[0].data[2].value++ } else if (res.data.list[i].value <= 1000) { FPOption.series[0].data[3].value++ } else { FPOption.series[0].data[4].value++ }
				}
			} else
			if (type === 2) {
				Page.FCP = res.data.avg.toFixed(2)
				for (let i = 0; i < res.data.list.length; i++) {
					if (res.data.list[i].value <= 100) { FCPOption.series[0].data[0].value++ } else if (res.data.list[i].value <= 300) { FCPOption.series[0].data[1].value++ } else if (res.data.list[i].value <= 500) { FCPOption.series[0].data[2].value++ } else if (res.data.list[i].value <= 1000) { FCPOption.series[0].data[3].value++ } else { FCPOption.series[0].data[4].value++ }
				}
			} else
			if (type === 3) {
				Page.DOM_Ready = res.data.avg.toFixed(2)
			} else
			if (type === 5) {
				Page.DOM_Complete = res.data.avg.toFixed(2)
			} else
			if (type === 6) {
				Page.DOM_Interactive = res.data.avg.toFixed(2)
				for (let i = 0; i < res.data.list.length; i++) {
					if (res.data.list[i].value <= 500) { InteractiveOption.series[0].data[0].value++ } else if (res.data.list[i].value <= 1000) { InteractiveOption.series[0].data[1].value++ } else if (res.data.list[i].value <= 2000) { InteractiveOption.series[0].data[2].value++ } else if (res.data.list[i].value <= 5000) { InteractiveOption.series[0].data[3].value++ } else { InteractiveOption.series[0].data[4].value++ }
				}
			} else
			if (type === 7) {
				Page.LCP = res.data.avg.toFixed(2)
				for (let i = 0; i < res.data.list.length; i++) {
					if (res.data.list[i].value <= 200) { LCPOption.series[0].data[0].value++ } else if (res.data.list[i].value <= 500) { LCPOption.series[0].data[1].value++ } else if (res.data.list[i].value <= 1000) { LCPOption.series[0].data[2].value++ } else { LCPOption.series[0].data[3].value++ }
				}
			}
		})
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
				<el-col :span="10">
					<el-card class="mal">
						<VChart
							class="chart"
							:option="PageOption"
							:autoresize="true"
						></VChart>
					</el-card>
				</el-col>
				<el-col :span="14">
					<el-card class="mal">
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
		</div>

		<div class="ma">
			<div class="title">
				接口性能
			</div>
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<span>请求接口总数量</span>
						<br />
						<b class="fs">{{ Interface.Sum.toFixed(2) }}</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>接口请求平均耗时</span>
						<br />
						<b class="fs">{{ Interface.Time.toFixed(2) }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>接口请求成功率</span>
						<br />
						<b class="fs">{{ Interface.SuccessRate.toFixed(2) }}%</b>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="ma">
			<el-row>
				<el-col :span="10">
					<el-card class="mal">
						<VChart
							class="chart"
							:option="InterfaceOption"
							:autoresize="true"
						></VChart>
					</el-card>
				</el-col>
				<el-col :span="14">
					<el-card class="mal">
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
