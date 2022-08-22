<script lang="ts" setup>
import { onActivated, onMounted, reactive, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import router from '../../router'
import { useProjectsStore } from '../../stores/projects'
import { axios } from '../../request.js'
import { calcDelta, processDuration } from '../../utils/utils'
const projectsStore = useProjectsStore()

const pvtableData = ref([] as any[])

const uvtableData = ref([] as any[])

const usertime = ref([] as any[])

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

const add = function () {
	router.push('setting')
}
let id = -1
const list = 1
const topData = reactive({ PV: 0, UV: 0, time: 0, pvUp: 0, uvUp: 0 })
async function Bget(id: number) {
	const pvreq = await axios.get(`/behavior/visit/pv?id=${id}`)

	topData.PV = pvreq.data[6]
	topData.pvUp = calcDelta(pvreq.data[pvreq.data.length - 2], pvreq.data[pvreq.data.length - 1])
	console.log(pvreq)
	for (let index = 0; index < pvreq.data.length; index++) {
		pvOption.value.series[0].data[index] = pvreq.data[index]
	}
	const uvreq = await axios.get(`/behavior/visit/uv?id=${id}`)

	for (let index = 0; index < uvreq.data.length; index++) {
		uvOption.value.series[0].data[index] = uvreq.data[index]
	}
	topData.UV = uvreq.data[6]
	topData.uvUp = calcDelta(uvreq.data[uvreq.data.length - 2], uvreq.data[uvreq.data.length - 1])
	const staytime = await axios.get(`/behavior/stay/${id}`)

	if (staytime.data) {
		topData.time = staytime.data.toFixed(0)
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
	const staytable = await axios.get(`/behavior/stay/${id}?list=${list}`)
	if (staytable.data) {
		for (let o = 0; o < staytable.data.length; o++) {
			const table = {
				from: staytable.data[o].from,
				duration: `${processDuration(staytable.data[o].duration)}`,
			}
			usertime.value.push(table)
		}
	}
}

onMounted(() => {
	watch(
		() => projectsStore.choose,
		(newVal, oldVal) => {
			if (newVal !== -1) {
				topData.UV = 0
				topData.time = 0
				topData.PV = 0
				pvtableData.value = []
				uvtableData.value = []
				usertime.value = []
				id = projectsStore.projects[projectsStore.choose].id
				Bget(id)
			}
		},
	)
})
onActivated(() => {
	console.log('onActivated')
	if (projectsStore.choose !== -1) {
		id = projectsStore.projects[projectsStore.choose].id
		topData.UV = 0
		topData.time = 0
		topData.PV = 0
		pvtableData.value = []
		uvtableData.value = []
		usertime.value = []
		Bget(id)
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
		<div class="cardList">
			<el-card>
				<template #header>
					<span>用户访问数据</span>
				</template>
				<div class="dataBox">
					<div>
						<div>浏览量(PV)</div>
						<p class="data">
							{{ topData.PV }}
						</p>
						<p class="compare">
							较昨日
							<span
								:class="{
									down: topData.pvUp < 0,
									up: topData.pvUp >= 0,
								}"
							>
								{{ topData.pvUp === Infinity ? '∞' : topData.pvUp.toFixed(1) }}%
								{{ topData.pvUp >= 0 ? '↑' : '↓' }}
							</span>
						</p>
					</div>
					<div>
						<div>访客数(UV)</div>
						<p class="data">
							{{ topData.UV }}
						</p>
						<p class="compare">
							较昨日
							<span
								:class="{
									down: topData.uvUp < 0,
									up: topData.uvUp >= 0,
								}"
							>
								{{ topData.uvUp === Infinity ? '∞' : topData.uvUp.toFixed(1) }}%
								{{ topData.uvUp >= 0 ? '↑' : '↓' }}
							</span>
						</p>
					</div>
					<div>
						<div>平均浏览时长</div>
						<p class="data">
							{{ topData.time }} s
						</p>
					</div>
				</div>
			</el-card>
		</div>

		<div class="userForm">
			<el-row>
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
								prop="from"
								label="来源 URL"
							/>
							<el-table-column
								prop="pv"
								label="PV"
								width="80"
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
				<el-col :span="24">
					<el-card style="margin: 1rem;">
						<template #header>
							<div class="card-header">
								<span>页面停留时间排行</span>
							</div>
						</template>
						<el-table
							:data="usertime"
							style="width: 100%"
							height="240"
						>
							<el-table-column
								prop="from"
								label="来源 URL"
							/>
							<el-table-column
								prop="duration"
								label="时间"
								width="180"
							/>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="userChart">
			<el-row>
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
								prop="from"
								label="来源 URL"
							/>
							<el-table-column
								prop="uv"
								label="PV"
								width="80"
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
	</div>
</template>

<style scoped>
.dataBox {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	text-align: center;
}

.dataBox>div {
	width: 33%;
	display: flex;
	flex-direction: column;
}

.dataBox>div>.data {
	font-size: 48px;
	margin: .3rem 0 0 0;
}

.compare {
	font-size: 15px;
	color: gray;
}

.compare>span.up {
	color: rgb(228, 23, 23);
}

.compare>span.down {
	color: rgb(6, 122, 11);
}

.box-card {
	width: 30%;
	margin: .5rem 0;
}

.cardList {
	width: calc(100% - 2rem);
	padding: 1rem;
	text-align: center;
}

.card {
	text-align: center;
}

.card p {
	font-size: 50px;
}

.chart {
	height: 300px;
}
</style>
