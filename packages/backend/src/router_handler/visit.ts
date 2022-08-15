import db from '../db/index.js'
import date from '../date.js'

type Person = {
	addVisit(req: any, res: any): void
	queryVisit(req: any, res: any): void
	addstay(req: any, res: any): void
	querystay(req: any, res: any): void
}

const pageVisit: Person = {
	addVisit(req, res) {
		res.send('添加访问记录')
	},
	queryVisit(req, res) {
		res.send('查询访问记录')
	},
	addstay(req, res) {
		const sql: string = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('key值错误等!', 400)
			}
			const sql: string = `INSERT INTO page_visit SET ? `
			const stay: {
				proj: number
				from: string
				time: any
				duration: number
			} = {
				proj: results[0].id,
				from: req.body.from,
				time: date(true),
				duration: req.body.duration,
			}
			db.query(sql, stay, (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('插入失败！', 400)
				}
				res.cc('插入成功！', 200)
			})
		})
	},
	querystay(req, res) {
		const sql: string =
			'SELECT `from`, duration FROM page_visit  WHERE proj=? ORDER BY duration DESC'
		db.query(sql, req.params.id, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length == 0) {
				return res.cc('暂无数据！', 400)
			}
			res.send({
				code: 200,
				message: '查询停留记录成功！',
				data: results,
			})
		})
	},
}
export default pageVisit
