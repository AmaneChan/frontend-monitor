import qs from 'qs'
import axiosStatic from 'axios'

export const axios = axiosStatic.create({
	method: 'GET',
	timeout: 7000,
	baseURL: 'http://localhost:3000/',
})

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	config.data = qs.stringify(config.data) // convert application/json to application/x-www-form-urlencoded
	if (!config.headers) { return config }
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	if (token) { // add auth header if exists
		config.headers.Authorization = token
	}
	return config
})

axios.interceptors.response.use((response) => {
	response = response.data
	return response
})

export interface ReponseResult {
	code: number
	message: string
	data?: any
	token?: string
}
