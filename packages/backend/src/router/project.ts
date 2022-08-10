import express from 'express'
import projectHandler from '../router_handler/project.js'

const router = express.Router()

//添加项目
router.post('/', projectHandler.addProject)

//获取项目信息
router.get('/', projectHandler.queryProject)

//修改项目信息
router.put('/', projectHandler.alterProject)

export default router
