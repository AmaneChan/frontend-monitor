import express from 'express'
import userHandler from '../router_handler/user.js'
import expressJoi from '@escook/express-joi'
import { reg_register_schema, reg_login_schema } from '../schema/user.js'

const router = express.Router()

//注册
router.post('/register', expressJoi(reg_register_schema), userHandler.regUser)

//登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

//获取用户信息
router.get('/info', userHandler.gaininfo)

//修改用户名
router.post('/info', userHandler.alterinfo)

//修改密码
router.post('/pwd', userHandler.alterpwd)

export default router
