import express from 'express'
import perfDataHandler from '../router_handler/perf_data.js'

const router = express.Router()

//添加性能数据
router.post('/', perfDataHandler.addperfData)

//查询性能数据
router.get('/', perfDataHandler.queryperfData)

export default router
