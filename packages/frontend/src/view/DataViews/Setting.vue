<script lang="ts" setup>
import { ref } from 'vue'
import { CopyDocument, Hide, View } from '@element-plus/icons-vue'

import { useProjectsStore } from '../../stores/projects'
import { axios } from '../../request.js'
import { ElMessage } from 'element-plus';

const projectsStore = useProjectsStore()

let username = ref('')
let token: string | null = localStorage.getItem('token') + '';
let userid = ''
axios.get('/user/info', { 
	headers: { Authorization: token }
	})
	.then(function (res) {
		console.log(res)
		username.value = res.data.username
		userid = res.data.id
	})
let PName = ref('项目名称')
const AddProject = function () {
	console.log(PName);
	
	axios.post('/project',{id:userid,name:PName.value,Headers:{Authorization: token}}).then((res) => {
		console.log(res);
		ElMessage.success('添加成功')
	})
} 
</script>

<template>
	<el-card style="margin: 1rem">
		<template #header>
			<div class="card-header">
				<span>用户信息</span>
			</div>
		</template>
		<div class="content">
			<div>
				<span class="valueContent">用户名:</span>
				<span class="valueContent">{{ username }}</span>
				<el-button type="primary" size="small">修改</el-button>
			</div>
			<div>
				<span class="valueContent">密码:</span>
				<span class="valueContent">********</span>
				<el-button type="primary" size="small">修改</el-button>
			</div>
			<div>
				<el-button type="danger" size="small">退出登录</el-button>
			</div>
			<div>
				<input  v-model="PName" style="margin: 0.5rem;"/>
				<el-button type="danger" size="small" @click="AddProject">添加项目</el-button>
			</div>
		</div>
		<div class="title">项目列表</div>
		<div class="content">
			<el-table :data="projectsStore.projects">
				<el-table-column prop="id" label="编号" />
				<el-table-column prop="name" label="名称" />
				<el-table-column prop="key" label="SDK Key">
					<template #default="scope">
						<div style="display: flex; align-items: center">
							<span style="width: 6rem">
								{{ scope.row.show ? scope.row.key : '******' }}
							</span>
							<el-button
								type="primary"
								size="small"
								:icon="scope.row.show ? Hide : View"
								@click="scope.row.show = !scope.row.show"
							></el-button>
							<el-button
								type="primary"
								size="small"
								:icon="CopyDocument"
							></el-button>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default>
						<el-button link type="primary" size="small">选择项目</el-button>
						<el-button link type="primary" size="small">修改名称</el-button>
						<el-button link type="primary" size="small">删除项目</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-card>
</template>

<style scoped>
.input {
	display: inline-block;
}

.title {
	font-size: 1.15rem;
	margin: 1rem;
}

.content {
	padding: 1rem;
}

.content > div {
	margin: 1rem 0;
}

.valueContent {
	margin: 0 0.5rem;
	width: 4rem;
	display: inline-block;
}

.valueContent + .valueContent {
	width: 6rem;
}
</style>
