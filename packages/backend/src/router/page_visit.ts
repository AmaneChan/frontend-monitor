import express from 'express'
import pageVisitHandler from '../router_handler/page_visit.js'

const router = express.Router()

//用户页面访问
router.post('/visit', pageVisitHandler.addVisit)

//查询访问记录
router.get('/visit', pageVisitHandler.queryVisit)

//用户停留时间
router.post('/stay', pageVisitHandler.addstay)

//查询用户停留记录
router.get('/stay', pageVisitHandler.querystay)

export default router
