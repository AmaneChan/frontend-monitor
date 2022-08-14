import express from 'express'
import perfDataHandler from '../router_handler/perf_data.js'
//解析token
import config from '../config.js'
import expressJWt from 'express-jwt'

const router = express.Router()

//添加性能数据
router.post('/', perfDataHandler.addperfData)

//查询性能数据
router.get(
	'/',
	expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
	perfDataHandler.queryperfData,
)

export default router
