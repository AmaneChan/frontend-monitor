<script lang="ts" setup>
import { ref } from 'vue'
import { CopyDocument, Hide, View } from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import { useProjectsStore } from '../../stores/projects'
import { useUserStore } from '../../stores/user'
import { axios } from '../../request.js'
import type { ResponseResult } from '../../request.js'
import router from '../../router'

const projectsStore = useProjectsStore()

const username = ref('')
let userid = ''
axios.get('/user/info')
	.then((res) => {
		console.log(res)
		username.value = res.data.username
		userid = res.data.id
	})

const name = ref('')

async function addProject() {
	const result: ResponseResult = await axios.post('/project', { id: userid, name: name.value })
	console.log(result)
	ElMessage.success(result.message)
}

const userStore = useUserStore()

function logout() {
	userStore.logout()
	ElMessage.success('已退出登录')
	router.push('/entry')
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
				<el-button
					type="primary"
					size="small"
				>
					修改
				</el-button>
			</div>
			<div>
				<span class="valueContent">密码:</span>
				<span class="valueContent">********</span>
				<el-button
					type="primary"
					size="small"
				>
					修改
				</el-button>
			</div>
			<div>
				<el-button
					type="danger"
					size="small"
					@click="logout"
				>
					退出登录
				</el-button>
			</div>
			<div>
				<el-input
					v-model="name"
					placeholder="项目名称"
					style="display: inline-block;"
				/>
				<el-button
					type="danger"
					size="small"
					@click="addProject"
				>
					添加项目
				</el-button>
			</div>
		</div>
		<div class="title">
			项目列表
		</div>
		<div class="content">
			<el-table :data="projectsStore.projects">
				<el-table-column
					prop="id"
					label="编号"
				/>
				<el-table-column
					prop="name"
					label="名称"
				/>
				<el-table-column
					prop="key"
					label="SDK Key"
				>
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
						<el-button
							link
							type="primary"
							size="small"
						>
							选择项目
						</el-button>
						<el-button
							link
							type="primary"
							size="small"
						>
							修改名称
						</el-button>
						<el-button
							link
							type="primary"
							size="small"
						>
							删除项目
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-card>
</template>

<style scoped>
.el-input {
	width: fit-content;
	margin: .5rem 1rem .5rem 0;
}

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
