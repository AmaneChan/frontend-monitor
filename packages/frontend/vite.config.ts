import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		ElementPlus(),
	],
	server: {
		port: 3001,
	},
	esbuild: {
		pure: ['console.log'],
		minify: true,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					ele: ['element-plus'],
					chart: ['echarts'],
				},
			},
		},
	},
})
