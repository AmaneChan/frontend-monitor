import express from 'express'
import exceptionDataHandler from '../router_handler/exception_data.js'
//解析token
import config from '../config.js'
import expressJWt from 'express-jwt'

import expressJoi from '@escook/express-joi'
import {
	reg_addexceptionData_schema,
	req_queryexceptionData_schema,
} from '../schema/exception_data.js'

const router = express.Router()

//添加性能数据
router.post(
	'/',
	expressJoi(reg_addexceptionData_schema),
	exceptionDataHandler.addexceptionData,
)

//查询性能数据
router.get(
	'/',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryexceptionData_schema),
	],
	exceptionDataHandler.queryexceptionData,
)

export default router
