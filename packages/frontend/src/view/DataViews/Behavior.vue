<script lang="ts" setup>
import VChart from 'vue-echarts'
import router from '../../router'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const tableData = [
	{
		userId: 'superd',
		page: 'https://www.baidu.com',
		userIp: '119.84.70.231',
		address: '中国 重庆 重庆市',
		time: '2021-02-22 10:20:19',
	},
	{
		userId: 'superd',
		page: 'https://www.baidu.com',
		userIp: '119.84.70.231',
		address: '中国 重庆 重庆市',
		time: '2021-02-22 10:20:19',
	},
	{
		userId: 'superd',
		page: 'https://www.baidu.com',
		userIp: '119.84.70.231',
		address: '中国 重庆 重庆市',
		time: '2021-02-22 10:20:19',
	},
]
const uvOption = {
	title: {
		text: '浏览量变化趋势',
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
}
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
		<div class="cardList">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>浏览量(PV)</span>
					</div>
				</template>
				<div class="card">
					<p>200033</p>
					<div class="compare">
						较昨日
						<span style="color: red">16.83% ↑</span>
					</div>
				</div>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>访问量(UV)</span>
					</div>
				</template>
				<div class="card">
					<p>200033</p>
					<div class="compare">
						较昨日
						<span style="color: red">16.83% ↑</span>
					</div>
				</div>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>用户停留时间</span>
					</div>
				</template>
				<div class="card">
					<p>200033</p>
					<div class="compare">
						较昨日
						<span style="color: red">16.83% ↑</span>
					</div>
				</div>
			</el-card>
		</div>

		<div class="userForm">
			<el-card>
				<el-table
					:data="tableData"
					style="width: 100%"
				>
					<el-table-column
						prop="userId"
						label="用户ID"
					/>
					<el-table-column
						prop="page"
						label="页面"
					/>
					<el-table-column label="设备平台">
						<svg
							style="width: 15px; height: 15px; margin-right: 10px"
							t="1660189913325"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="2439"
							width="200"
							height="200"
						>
							<path
								d="M426.285714 574.857143v372l-389.714285-53.714286v-318.285714h389.714285z m0-424.571429v376.571429H36.571429V204z m561.142857 424.571429v449.142857l-518.285714-71.428571v-377.714286h518.285714z m0-501.714286v453.714286H469.142857V144.571429z"
								p-id="2440"
								fill="#1296db"
							/>
						</svg>
						<svg
							style="width: 15px; height: 15px"
							t="1660190173965"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="4201"
							width="200"
							height="200"
						>
							<path
								d="M123.648 178.346667C361.642667-98.602667 802.986667-43.946667 967.936 279.68h-396.501333c-71.424 0-117.546667-1.621333-167.509334 24.661333-58.709333 30.933333-102.997333 88.234667-118.485333 155.52L123.648 178.389333z"
								fill="#EA4335"
								p-id="4202"
							/>
							<path
								d="M341.674667 512c0 93.866667 76.330667 170.24 170.154666 170.24 93.866667 0 170.154667-76.373333 170.154667-170.24s-76.330667-170.24-170.154667-170.24c-93.866667 0-170.154667 76.373333-170.154666 170.24z"
								fill="#4285F4"
								p-id="4203"
							/>
							<path
								d="M577.877333 734.848c-95.530667 28.373333-207.274667-3.114667-268.501333-108.8-46.762667-80.64-170.24-295.765333-226.346667-393.557333-196.565333 301.226667-27.136 711.808 329.685334 781.866666l165.12-279.509333z"
								fill="#34A853"
								p-id="4204"
							/>
							<path
								d="M669.866667 341.76a233.130667 233.130667 0 0 1 43.008 286.634667c-40.576 69.973333-170.154667 288.682667-232.96 394.581333 367.658667 22.656 635.733333-337.664 514.645333-681.258667H669.866667z"
								fill="#FBBC05"
								p-id="4205"
							/>
						</svg>
					</el-table-column>
					<el-table-column
						prop="userIp"
						label="用户IP地址"
					/>
					<el-table-column
						prop="address"
						label="位置"
					/>
					<el-table-column
						prop="time"
						label="发生时间"
					/>
				</el-table>
			</el-card>
		</div>
		<div class="userChart">
			<el-card>
				<VChart
					class="chart"
					:option="uvOption"
					:autoresize="true"
				></VChart>
			</el-card>
		</div>
	</div>
</template>

<style scoped>
.box-card {
	width: 30%;
	margin: 1rem;
}

.cardList {
	display: flex;
	justify-content: space-around;
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
	margin: 10px 0;
}
.userForm,
.userChart {
	margin: 1rem;
}
.chart {
	height: 300px;
}
</style>
