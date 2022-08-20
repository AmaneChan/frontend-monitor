<script lang="ts" setup>
import { onMounted, ref } from 'vue'
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

const id = 3
const list = 1
const Pdata = ref({ PV: 0, UV: 0, time: 0 })
async function Bget(id: number) {
	const pvreq = await axios.get(`/behavior/visit/pv?id=${id}`)

	Pdata.value.PV = pvreq.data[new Date().getDay()]

	for (let index = 0; index < pvreq.data.length; index++) {
		pvOption.value.series[0].data[index] = pvreq.data[index]
	}

	const uvreq = await axios.get(`/behavior/visit/uv?id=${id}`)

	for (let index = 0; index < uvreq.data.length; index++) {
		uvOption.value.series[0].data[index] = uvreq.data[index]
	}

	Pdata.value.UV = uvreq.data[new Date().getDay()]

	const staytime = await axios.get('/behavior/stay/3')

	Pdata.value.time = staytime.data.toFixed(2)

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
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>浏览量(PV)</span>
					</div>
				</template>
				<div class="card">
					<p>{{ Pdata.PV }}个</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>访问量(UV)</span>
					</div>
				</template>
				<div class="card">
					<p>{{ Pdata.UV }}个</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>用户停留时间</span>
					</div>
				</template>
				<div class="card">
					<p>{{ Pdata.time }}S</p>
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
.box-card {
	width: 30%;
	margin: .5rem 0;
}

.cardList {
	display: flex;
	justify-content: space-between;
	padding: 1rem;
}

.compare {
	font-size: 15px;
	color: gray;
}

.card {
	text-align: center;
}

.card p {
	font-size: 50px;
	/* margin: 10px 0; */
}

.chart {
	height: 300px;
}
</style>
