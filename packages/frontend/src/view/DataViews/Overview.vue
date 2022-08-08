<script lang="ts" setup>
import { ref } from 'vue'
import Chartstwo from '../../components/Chart.vue'

const parentValue = ref('domid')
const dom = ref('dom')
const dom1 = ref('dom1')
const dom2 = ref('dom2')

let opt = ref({
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
let opt1 = ref({
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
</script>

<template>
	<div>
		<div class="ma">
			<el-row>
				<el-col :span="8">
					<div class="ma">
						<el-card class="box-card" style="height: 10rem">数据1</el-card>
					</div>

					<div class="ma">
						<el-card class="box-card" style="height: 10rem">数据2</el-card>
					</div>
				</el-col>

				<el-col :span="8">
					<div class="ma">
						<el-card>
							<Chartstwo :value="dom" :option="opt1"></Chartstwo>
						</el-card>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="ma">
						<el-card class="box-card" style="height: 10rem">数据3</el-card>
					</div>

					<div class="ma">
						<el-card class="box-card" style="height: 10rem">数据4</el-card>
					</div>
				</el-col>
			</el-row>

			<div class="ma">
				<el-card>
					<Chartstwo :value="parentValue" :option="opt"></Chartstwo>
				</el-card>
			</div>

			<el-row>
				<el-col :span="12">
					<div class="ma">
						<el-card>
							<Chartstwo :value="dom1" :option="opt"></Chartstwo>
						</el-card>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="ma">
						<el-card>
							<Chartstwo :value="dom2" :option="opt1"></Chartstwo>
						</el-card>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style>
.hvh {
	height: 100vh;
}
.ma {
	margin: 1rem;
}
.mt {
	margin-top: 1rem;
}
.ba {
	background-color: brown;
}
.hw {
	width: 100%;
	height: 300px;
}
</style>
