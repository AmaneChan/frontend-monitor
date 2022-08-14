import express from 'express'
import pageVisitHandler from '../router_handler/page_visit.js'
//解析token
import config from '../config.js'
import expressJWt from 'express-jwt'

const router = express.Router()

//用户页面访问
router.post('/visit', pageVisitHandler.addVisit)

//查询访问记录
router.get(
	'/visit',
	expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
	pageVisitHandler.queryVisit,
)

//用户停留时间
router.post('/stay', pageVisitHandler.addstay)

//查询用户停留记录
router.get(
	'/stay',
	expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
	pageVisitHandler.querystay,
)

export default router
