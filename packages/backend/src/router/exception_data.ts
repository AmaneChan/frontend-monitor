import express from 'express'
import exceptionDataHandler from '../router_handler/exception_data.js'
//解析token
import config from '../config.js'
import expressJWt from 'express-jwt'

const router = express.Router()

//添加性能数据
router.post('/', exceptionDataHandler.addexceptionData)

//查询性能数据
router.get(
	'/',
	expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
	exceptionDataHandler.queryexceptionData,
)

export default router
