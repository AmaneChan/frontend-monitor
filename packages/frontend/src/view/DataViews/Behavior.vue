<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import router from '../../router'
import { useProjectsStore } from '../../stores/projects'
import { axios } from '../../request.js'
const projectsStore = useProjectsStore()

const pvtableData = ref([] as any[])

const uvtableData = ref([] as any[])

const usertime = ref([] as any[])

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
			data: [15, 23, 22, 21, 13, 14, 26],
			type: 'line',
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

const add = function () {
	router.push('setting')
}
let id = 3
const list = 1
const topData = reactive({ PV: 0, UV: 0, time: 0, pvUp: 0, uvUp: 0 })
async function Bget(id: number) {
	const pvreq = await axios.get(`/behavior/visit/pv?id=${id}`)

	topData.PV = pvreq.data[new Date().getDay()]

	topData.pvUp = pvreq.data[pvreq.data.length - 2] / pvreq.data[pvreq.data.length - 1]
	topData.pvUp = Number((topData.pvUp * 100).toFixed(1))

	for (let index = 0; index < pvreq.data.length; index++) {
		pvOption.value.series[0].data[index] = pvreq.data[index]
	}

	const uvreq = await axios.get(`/behavior/visit/uv?id=${id}`)

	for (let index = 0; index < uvreq.data.length; index++) {
		uvOption.value.series[0].data[index] = uvreq.data[index]
	}

	topData.UV = uvreq.data[new Date().getDay()]

	topData.uvUp = uvreq.data[uvreq.data.length - 2] / uvreq.data[uvreq.data.length - 1]
	topData.uvUp = Number((topData.uvUp * 100).toFixed(1))

	console.log(topData.uvUp, topData.pvUp)

	const staytime = await axios.get('/behavior/stay/3')
	console.log(uvreq, pvreq, staytime)

	topData.time = staytime.data.toFixed(0)

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
	const staytable = await axios.get(`/behavior/stay/${id}?list=${list}`)
	for (let o = 0; o < staytable.data.length; o++) {
		const table = {
			from: staytable.data[o].from,
			duration: `${staytable.data[o].duration}s`,
		}
		usertime.value.push(table)
	}
}

onMounted(() => {
	Bget(id)
	watch(() => projectsStore.choose, (newVal, oldVal) => {
		if (newVal !== -1) {
			id = projectsStore.projects[projectsStore.choose].id
			Bget(id)
		}
	})
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
									up: topData.pvUp > 0,
								}"
							>
								{{ topData.pvUp === Infinity ? '∞' : topData.pvUp }}%
								{{ topData.pvUp > 0 ? '↑' : '↓' }}
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
									up: topData.uvUp > 0,
								}"
							>
								{{ topData.uvUp === Infinity ? '∞' : topData.uvUp }}%
								{{ topData.uvUp > 0 ? '↑' : '↓' }}
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
				<el-col :span="24">
					<el-card style="margin: 1rem;">
						<template #header>
							<div class="card-header">
								<span>用户停留时间排行</span>
							</div>
						</template>
						<el-table
							:data="usertime"
							style="width: 100%"
							height="240"
						>
							<el-table-column
								prop="from"
								label="From"
							/>
							<el-table-column
								prop="duration"
								label="时间"
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
