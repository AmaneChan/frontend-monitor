<script lang="ts" setup></script>

<template>
	<div>
		<el-menu default-active="1-1" class="el-menu-vertical-demo">
			<el-sub-menu index="1">
				<template #title>
					<el-icon><location /></el-icon>
					<span>应用</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1">总览</el-menu-item>
					<el-menu-item index="1-2">满意度趋势</el-menu-item>
					<el-menu-item index="1-3">访问速度</el-menu-item>
					<el-menu-item index="1-4">会话追踪</el-menu-item>
					<el-menu-item index="1-5">JS错误诊断</el-menu-item>
					<el-menu-item index="1-6">API请求</el-menu-item>
					<el-menu-item index="1-8">API详情</el-menu-item>
					<el-menu-item index="1-9">自定义统计</el-menu-item>
					<el-menu-item index="1-10">访问明细</el-menu-item>
					<el-menu-item index="1-11">多维分析</el-menu-item>
					<el-menu-item index="1-12">灰度报表</el-menu-item>
					<el-menu-item index="1-13">体验分</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>

			<el-sub-menu index="2">
				<template #title>
					<el-icon><CollectionTag /></el-icon>
					<span>维度</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1">页面</el-menu-item>
					<el-menu-item index="2-2">地理</el-menu-item>
					<el-menu-item index="2-3">终端</el-menu-item>
					<el-menu-item index="2-4">网络</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>

			<el-menu-item index="3">
				<el-icon><EditPen /></el-icon>
				<span>设置</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<style></style>
