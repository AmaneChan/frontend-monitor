import express from 'express'
import exceptionDataHandler from '../router_handler/exception_data.js'

const router = express.Router()

//添加性能数据
router.post('/', exceptionDataHandler.addexceptionData)

//查询性能数据
router.get('/', exceptionDataHandler.queryexceptionData)

export default router
