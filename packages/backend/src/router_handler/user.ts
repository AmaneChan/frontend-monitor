import db from '../db/index.js'
import bcryt from 'bcryptjs'

type Person = {
	regUser(req: any, res: any): void
	login(req: any, res: any): void
	gaininfo(req: any, res: any): void
	alterinfo(req: any, res: any): void
	alterpwd(req: any, res: any): void
}

const user: Person = {
	regUser(req, res) {
		const userinfo = req.body
		const sql = `SELECT * FROM user WHERE username=?`
		db.query(sql, [userinfo.username], (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length > 0) {
				return res.cc('用户名被占用，请更换其它用户名！', 400)
			}
			userinfo.pwd = bcryt.hashSync(userinfo.pwd, 10)
			const sql = `INSERT INTO user SET ?`
			db.query(
				sql,
				{ id: 0, username: userinfo.username, pwd: userinfo.pwd },
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.affectedRows !== 1) {
						return res.cc('注册新用户失败，请稍后再试！', 500)
					}
					res.send('注册新用户成功！', 200)
				},
			)
		})
	},
	login(req, res) {
		res.send('登录')
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
