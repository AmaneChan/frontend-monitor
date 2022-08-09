<script lang="ts" setup>
import Chart from '../../components/Chart.vue'
let Page = {
	TTFBTime : 158.91,
	DomeTime : 1.52,
	LoadTime : 1.2
}
let Interface = {
	Sum : 156,
	Time : 124.22,
	SuccessRate : 100
}
let PageOption = {
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
let InterfaceOption = {
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
let PageChart = 'PageChart'
let InterfaceChart = 'InterfaceChart'
</script>

<template>
	<div>
		<div class="ma">
			<b>页面性能</b>
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<span>TTFB平均时间</span>
						<br />
						<b class="fs">{{ Page.TTFBTime }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>Dom解析时间</span>
						<br />
						<b class="fs">{{ Page.DomeTime }}s</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>页面平均加载时间</span>
						<br />
						<b class="fs">{{ Page.LoadTime }}s</b>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="ma">
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<Chart :value="PageChart" :option="PageOption"></Chart>
					</el-card>
				</el-col>
				<el-col :span="16">
					<el-card class="mal">
						<el-table :data="tableData" height="300" style="width: 100%">
							<el-table-column prop="date" label="Date" width="180" />
							<el-table-column prop="name" label="Name" width="180" />
							<el-table-column prop="address" label="Address" />
							<el-table-column prop="name" label="Name" width="180" />
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>

		<div class="ma">
			<b>接口性能</b>
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<span>请求接口总数量</span>
						<br />
						<b class="fs">{{ Interface.Sum }}ms</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>接口请求平均耗时</span>
						<br />
						<b class="fs">{{ Interface.Time }}s</b>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="mal">
						<span>接口请求成功率</span>
						<br />
						<b class="fs">{{ Interface.SuccessRate }}s</b>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="ma">
			<el-row>
				<el-col :span="8">
					<el-card class="mal">
						<Chart :value="InterfaceChart" :option="InterfaceOption"></Chart>
					</el-card>
				</el-col>
				<el-col :span="16">
					<el-card class="mal">
						<el-table :data="tableData" height="300" style="width: 100%">
							<el-table-column prop="date" label="Date" width="180" />
							<el-table-column prop="name" label="Name" width="180" />
							<el-table-column prop="address" label="Address" />
							<el-table-column prop="name" label="Name" width="180" />
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style scoped>
.ma {
	margin: 1rem;
}
.mal {
	margin-right: 0.5rem;
}
.fs {
	font-size: 2rem;
}
</style>
