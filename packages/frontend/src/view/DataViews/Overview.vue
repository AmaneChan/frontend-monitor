<script lang="ts" setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import router from '../../router'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()
const opt = ref({
	title: {
		text: 'xx分析',
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985',
			},
		},
	},
	legend: {
		data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
	},
	toolbox: {
		feature: {
			saveAsImage: {},
		},
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true,
	},
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
	],
	yAxis: [
		{
			type: 'value',
		},
	],
	series: [
		{
			name: 'Email',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: 'Union Ads',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [220, 182, 191, 234, 290, 330, 310],
		},
		{
			name: 'Video Ads',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [150, 232, 201, 154, 190, 330, 410],
		},
		{
			name: 'Direct',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [320, 332, 301, 334, 390, 330, 320],
		},
		{
			name: 'Search Engine',
			type: 'line',
			stack: 'Total',
			label: {
				show: true,
				position: 'top',
			},
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [820, 932, 901, 934, 1290, 1330, 1320],
		},
	],
})
const opt1 = ref({
	title: {
		text: 'one',
	},
	tooltip: {},
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line',
		},
	],
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
		<el-row>
			<el-col :span="8">
				<el-card
					class="box-card"
					style="height: 10rem"
				>
					数据1
				</el-card>

				<el-card
					class="box-card"
					style="height: 10rem"
				>
					数据2
				</el-card>
			</el-col>

			<el-col :span="8">
				<div
					class="cardContainer"
					style="margin-top: 16px"
				>
					<el-card>
						<VChart
							class="chart"
							:option="opt1"
							:autoresize="true"
						></VChart>
					</el-card>
				</div>
			</el-col>
			<el-col :span="8">
				<el-card
					class="box-card"
					style="height: 10rem"
				>
					数据3
				</el-card>

				<el-card
					class="box-card"
					style="height: 10rem"
				>
					数据4
				</el-card>
			</el-col>
		</el-row>

		<el-card class="box-card">
			<VChart
				class="chart"
				:option="opt"
				:autoresize="true"
			></VChart>
		</el-card>

		<el-row>
			<el-col :span="12">
				<el-card class="box-card">
					<VChart
						class="chart"
						:option="opt"
						:autoresize="true"
					></VChart>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
					<VChart
						class="chart"
						:option="opt1"
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
</style>
