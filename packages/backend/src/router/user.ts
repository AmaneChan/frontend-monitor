import express from 'express'
import userHandler from '../router_handler/user.js'
import expressJoi from '@escook/express-joi'
import {
	reg_register_schema,
	reg_login_schema,
	req_alterinfo_schema,
	req_alterpwd_schema,
} from '../schema/user.js'
//解析token
import config from '../config.js'
import expressJWt from 'express-jwt'

const router = express.Router()

//注册
router.post('/register', expressJoi(reg_register_schema), userHandler.regUser)

//登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

//获取用户信息
router.get(
	'/info',
	expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
	userHandler.gaininfo,
)

//修改用户名
router.post(
	'/info',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_alterinfo_schema),
	],
	userHandler.alterinfo,
)

//修改密码
router.post(
	'/pwd',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_alterpwd_schema),
	],
	userHandler.alterpwd,
)

export default router
