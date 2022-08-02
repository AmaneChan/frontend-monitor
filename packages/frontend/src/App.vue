<template>
	<div>
		<head-menu></head-menu>
		<el-row>
			<el-col :span="3">
				<side-menu></side-menu>
			</el-col>

			<el-col :span="21">
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
									<Chartsone></Chartsone>
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
						<el-card >
						<Chartstwo></Chartstwo>
					</el-card>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setpu>
import { defineComponent, reactive, ref, toRefs, onMounted ,Ref } from 'vue'
import HeadMenu from './components/HeadMenu.vue'
import SideMenu from './components/SideMenu.vue'
import Chartsone from './components/Charts_one.vue'
import Chartstwo from './components/Charts_two.vue'
export default {
	name: 'App',
	components: {
		HeadMenu,
		SideMenu,
		Chartsone,
		Chartstwo
	},

	setup() {
		
	},
}
</script>

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
</style>
