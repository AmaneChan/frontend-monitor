import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {
	CanvasRenderer,
} from 'echarts/renderers'
import {
	LineChart,
	PieChart,
} from 'echarts/charts'
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components'

import { use } from 'echarts/core'

import router from './router'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

use([
	CanvasRenderer,
	LineChart,
	PieChart,
	LegendComponent,
	TooltipComponent,
	TitleComponent,
	GridComponent,
])

app.use(ElementPlus)
app.use(pinia)
app.use(router)
// app.config.globalProperties.$echarts = echarts

app.mount('#app')
