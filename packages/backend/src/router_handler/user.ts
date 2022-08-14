import db from '../db/index.js'
import bcryt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config.js'

type Person = {
	regUser(req: any, res: any): void
	login(req: any, res: any): void
	gaininfo(req: any, res: any): void
	alterinfo(req: any, res: any): void
	alterpwd(req: any, res: any): void
}

const user: Person = {
	regUser(req, res) {
		const userinfo: any = req.body
		const sql: string = `SELECT * FROM user WHERE username=?`
		db.query(sql, userinfo.username, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length > 0) {
				return res.cc('用户名被占用，请更换其它用户名！', 400)
			}
			userinfo.pwd = bcryt.hashSync(userinfo.pwd, 10)
			const sql: string = `INSERT INTO user SET ?`
			db.query(sql, userinfo, (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('注册新用户失败，请稍后再试！', 500)
				}
				res.send('注册新用户成功！', 200)
			})
		})
	},
	login(req, res) {
		const userinfo: any = req.body
		const sql: string = `SELECT * FROM user WHERE username=?`
		db.query(sql, userinfo.username, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('用户不存在！', 400)
			}
			//查询密码是否正确
			const compareResult: boolean = bcryt.compareSync(
				userinfo.pwd,
				results[0].pwd,
			)
			if (!compareResult) {
				return res.cc('密码错误！', 400)
			}
			const user: Object = { ...results[0], pwd: '' }
			const tokenStr: string = jwt.sign(user, config.jwtSecreKey, {
				expiresIn: '12h',
			})
			res.send({
				code: 200,
				message: '登录成功！',
				token: 'Bearer ' + tokenStr,
			})
		})
	},
	gaininfo(req, res) {
		res.send('获取用户信息')
	},
	alterinfo(req, res) {
		res.send('修改用户名')
	},
	alterpwd(req, res) {
		res.send('修改密码')
	},
}
export default user
