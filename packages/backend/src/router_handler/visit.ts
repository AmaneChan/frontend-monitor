import db from '../db/index.js'
import date from '../date.js'

interface Person {
	addVisit(req: any, res: any): void
	queryVisitPv(req: any, res: any): void
	queryVisitUv(req: any, res: any): void
	addstay(req: any, res: any): void
	querystay(req: any, res: any): void
}

const pageVisit: Person = {
	addVisit(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results_1) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results_1.length !== 1) {
				return res.cc('key值错误等!', 400)
			}

			const sql
				= 'SELECT count FROM visit_history WHERE day=? AND proj=? AND ip=? AND `from`=?'
			db.query(
				sql,
				[date(false), results_1[0].id, req.ip, req.body.from],
				(err, results_2) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results_2.length === 0) {
						const sql = 'INSERT INTO visit_history SET ?'
						db.query(
							sql,
							{
								proj: results_1[0].id,
								from: req.body.from,
								ip: req.ip,
								day: date(false),
								count: 1,
							},
							(err, results) => {
								if (err) {
									return res.cc(err, 500)
								}
								if (results.affectedRows !== 1) {
									return res.cc('插入失败！', 400)
								}
								res.cc('插入成功！', 200)
							},
						)
					}
					else {
						const sql
							= 'UPDATE visit_history SET count=? WHERE day=? AND proj=? AND ip=? AND `from`=? '
						db.query(
							sql,
							[
								++results_2[0].count,
								date(false),
								results_1[0].id,
								req.ip,
								req.body.from,
							],
							(err, results) => {
								if (err) {
									return res.cc(err, 500)
								}
								if (results.affectedRows !== 1) {
									return res.cc('插入失败！', 400)
								}
								res.cc('插入成功！', 200)
							},
						)
					}
				},
			)
		})
	},
	queryVisitPv(req, res) {
		res.send('查询访问记录')
	},
	queryVisitUv(req, res) {
		res.send('查询访问记录')
	},
	addstay(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('key值错误等!', 400)
			}
			const sql = 'INSERT INTO page_visit SET ? '
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
		const sql
			= 'SELECT `from`, AVG(`duration`) AS duration FROM page_visit WHERE proj=1 GROUP BY `from` ORDER BY duration DESC'
		db.query(sql, req.params.id, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length === 0) {
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
