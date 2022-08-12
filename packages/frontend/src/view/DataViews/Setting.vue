<script lang="ts" setup>
import { ref } from 'vue'
import { CopyDocument, Hide, View } from '@element-plus/icons-vue'

import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const username = ref('')
</script>

<template>
	<div class="title">
		用户信息
	</div>
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
			>
				退出登录
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
					<div style="display: flex; align-items: center;">
						<span style="width: 6rem;">
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

.content>div {
	margin: 1rem 0;
}

.valueContent {
	margin: 0 .5rem;
	width: 4rem;
	display: inline-block;
}

.valueContent + .valueContent {
	width: 6rem;
}
</style>
