<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { CopyDocument, Hide, View } from '@element-plus/icons-vue'
import ClipboardJS from 'clipboard'
import { ElMessage } from 'element-plus'
import { useProjectsStore } from '../../stores/projects'
import { useUserStore } from '../../stores/user'
import { axios } from '../../request.js'
import type { ResponseResult } from '../../request.js'

const projectsStore = useProjectsStore()
const userStore = useUserStore()

const projectName = ref('')

async function addProject() {
	if (projectName.value === '') {
		return ElMessage.error('项目名称不能为空')
	}
	const result: ResponseResult = await axios.post('/project', { id: userStore.id, name: projectName.value })
	projectName.value = ''
	projectsStore.updateProjects()
	ElMessage.success(result.message)
	console.log(result.message)
}

function logout() {
	userStore.logout()
	ElMessage.success('已退出登录')
}

const currentKey = computed(() => {
	if (projectsStore.choose < 0) {
		return ''
	}
	return projectsStore.projects[projectsStore.choose].key
})

const scriptWithKey = computed(() => {
	return `<script crossorigin report="http://120.79.27.173:2336" src="http://120.79.27.173:2349/index.js" id="__monitor" key="${currentKey.value}"><\/script>`
})

onMounted(() => {
	const clip = new ClipboardJS('.copyable')
	clip.on('success', (e) => {
		console.info('Action:', e.action)
		console.info('Text:', e.text)
		console.info('Trigger:', e.trigger)

		e.clearSelection()

		ElMessage.success('已成功复制到剪贴板')
	})

	clip.on('error', (e: { action: any; trigger: any }) => {
		console.error('Action:', e.action)
		console.error('Trigger:', e.trigger)
		ElMessage.error('你的浏览器暂不支持，请手动复制')
	})
})

const dialogFormVisible = ref(false)
let Pindex = -1
const Pform = ref({ name: '' })
const dialog = function (index: number) {
	Pform.value.name = ''
	dialogFormVisible.value = true
	Pindex = index
}
const dialogB = function () {
	dialogFormVisible.value = false
	Pname(projectsStore.projects[Pindex].id, Pform.value.name)
}

const modify = ref(true)
const userName = ref('')

async function modifyUserName() {
	modify.value = !modify.value
	if (userName.value === '') {
		return ElMessage.error('用户名称不能为空')
	}
	const result: ResponseResult = await axios.post('/user/info', { id: userStore.id, username: userName.value })
	userName.value = ''
	ElMessage.success(result.message)
	console.log(result.message)
	userStore.login()
}

const modify2 = ref(true)
const userPwd = ref('')
const userNewPwd = ref('')

async function modifyUserPwd() {
	modify2.value = !modify2.value
	if (userPwd.value === '') {
		return ElMessage.error('旧密码不能为空')
	}
	if (userNewPwd.value === '') {
		return ElMessage.error('新密码不能为空')
	}
	const result: ResponseResult = await axios.post('/user/pwd', { id: userStore.id, oldPwd: userPwd.value, newPwd: userNewPwd.value })
	if (result.code === 200) {
		userPwd.value = ''
		userNewPwd.value = ''
		ElMessage.success(result.message)
	} else {
		ElMessage.error(result.message)
	}
	userPwd.value = ''
	userNewPwd.value = ''
}

async function Pname(id: number, name: string) {
	if (name === '') {
		return ElMessage.error('项目名称不能为空')
	}
	const req: ResponseResult = await axios.put('/project', { id, name })
	ElMessage.success(req.message)
	projectsStore.updateProjects()
}
</script>

<template>
	<div>
		<el-row>
			<el-col :span="10">
				<el-card style="margin: 1rem;">
					<template #header>
						<div>
							<span>用户信息</span>
						</div>
					</template>
					<div
						class="content"
						style="text-align: center; height: 15rem"
					>
						<div v-if="modify">
							<span class="valueContent">用户名:</span>
							<span class="valueContent">{{ userStore.username }}</span>
							<el-button
								type="primary"
								size="small"
								@click="modify = !modify"
							>
								修改
							</el-button>
						</div>
						<div v-else>
							<span class="valueContent">用户名:</span>
							<el-input
								v-model="userName"
								placeholder="新用户名"
								style="display: inline-block;"
							/>
							<el-button
								v-if="modify"
								type="primary"
								size="small"
								@click="modifyUserName"
							>
								确定1
							</el-button>
							<div v-if="!modify">
								<el-button
									type="primary"
									size="small"
									@click="modify = !modify"
								>
									取消
								</el-button>
								<el-button
									type="primary"
									size="small"
									@click="modifyUserName"
								>
									确定
								</el-button>
							</div>
						</div>
						<div v-if="modify2">
							<span class="valueContent">密码:</span>
							<span class="valueContent">********</span>
							<el-button
								type="primary"
								size="small"
								@click="modify2 = !modify2"
							>
								修改
							</el-button>
						</div>
						<div v-else>
							<span
								v-if="modify2"
								class="valueContent"
							>密码:</span>
							<el-input
								v-model="userPwd"
								placeholder="旧密码"
								style="display: inline-block;"
							/>
							<el-button
								type="primary"
								size="small"
								@click="modify2 = !modify2"
							>
								取消
							</el-button>
							<el-input
								v-model="userNewPwd"
								placeholder="新密码"
								style="display: inline-block;"
							/>
							<el-button
								type="primary"
								size="small"
								@click="modifyUserPwd"
							>
								确定
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
								v-model="projectName"
								placeholder="项目名称"
								style="display: inline-block;"
							/>
							<el-button
								type="primary"
								@click="addProject"
							>
								添加项目
							</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="14">
				<el-card style="margin: 1rem;">
					<template #header>
						<div>
							<span>SDK Key 使用方法</span>
						</div>
					</template>
					<div style="height: 17rem;">
						<p>
							点击下方项目列表中的复制按钮
							<span>
								<ElIcon color="#60608F">
									<CopyDocument></CopyDocument>
								</ElIcon>
							</span>
							，将复制 SDK Key。将 SDK Key 添加到 script 标签中。
						</p>
						<p>
							或者点击下方直接复制当前选择项目的 script 标签，标签上已经包含 SDK Key 信息。
						</p>
						<p>
							将 script 标签添加到你的页面中即可。（建议将 SDK 作为第一个 script 标签）
						</p>
						<el-input
							v-model="scriptWithKey"
							style="width: 100%;"
							readonly
						></el-input>
						<el-button
							class="copyable"
							type="primary"
							:icon="CopyDocument"
							:data-clipboard-text="scriptWithKey"
						>
							复制
						</el-button>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-card style="margin: 1rem;">
			<template #header>
				<div>
					<span>项目列表</span>
				</div>
			</template>
			<div class="content">
				<el-table :data="projectsStore.projects">
					<el-table-column
						prop="id"
						label="编号"
						width="96"
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
									class="copyable"
									:icon="CopyDocument"
									:data-clipboard-text="scope.row.key"
								></el-button>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template #default="scope">
							<el-button
								link
								type="primary"
								size="small"
								@click="projectsStore.setCurrentProj(scope.$index)"
							>
								选择项目
							</el-button>
							<el-button
								link
								type="primary"
								size="small"
								@click="dialog(scope.$index)"
							>
								修改名称
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>

		<el-dialog
			v-model="dialogFormVisible"
			title="修改项目名称"
		>
			<el-input
				v-model="Pform.name"
				autocomplete="off"
				style="width: 100%"
			/>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">关闭</el-button>
					<el-button
						type="primary"
						@click="dialogB"
					>确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
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
