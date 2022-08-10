import express from 'express'

//cors 跨域
import cors from 'cors'

//用户路由模块
import userRouter from './src/router/user.js'

//项目路由模块
import projectRouter from './src/router/project.js'

//用户行为路由模块
import pageRouter from './src/router/page_visit.js'

//性能数据路由模块
import perfRouter from './src/router/perf_data.js'

//异常数据路由模块
import exceptionRouter from './src/router/exception_data.js'

const app = express()
const PORT: number = 3000

//跨域处理中间件
app.use(cors())

//解析x-www-form-urlencoded数据中间件
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRouter)

app.use('/project', projectRouter)

app.use('/behavior', pageRouter)

app.use('/perf', perfRouter)

app.use('/exception', exceptionRouter)

app.listen(PORT, () => {
	console.log('Server started')
})
