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
							<el-row>
								<el-col>
									<div class="ma">
										<el-card class="box-card" style="height: 10rem;">数据1</el-card>
									</div>
								</el-col>
							</el-row>
                            
                            <el-row>
								<el-col>
									<div class="ma">
										<el-card class="box-card" style="height: 10rem;">数据1</el-card>
									</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="8">
							<div class="ma">
								<el-card>
									<Chartsone></Chartsone>
								</el-card>
							</div>
						</el-col>
						<el-col :span="8">
								<el-row>
								<el-col>
									<div class="ma">
										<el-card class="box-card" style="height: 10rem;">数据1</el-card>
									</div>
								</el-col>
							</el-row>
                            
                            <el-row>
								<el-col>
									<div class="ma">
										<el-card class="box-card" style="height: 10rem;">数据1</el-card>
									</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
                
			</el-col>

		</el-row>
        
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import HeadMenu from './components/HeadMenu.vue'
import SideMenu from './components/SideMenu.vue'
import Chartsone from './components/Charts_one.vue'

export default {
	name: 'App',
	components: {
		HeadMenu,
		SideMenu,
		Chartsone,
	},
	setup() {},
}
</script>

<style>
.hvh {
	height: 100vh;
}
.ma {
	margin: 1rem;
}
.mt{
    margin-top: 1rem;
}
.ba{
    background-color: brown;
}
</style>
