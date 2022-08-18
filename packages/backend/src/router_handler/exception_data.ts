import db from '../db/index.js'

interface Person {
	addexceptionData(req: any, res: any): void
	queryexceptionData(req: any, res: any): void
}

const project: Person = {
	addexceptionData(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('key值错误等!', 400)
			}
			const sql = 'INSERT INTO exception_data SET ?'
			const data: {
				type: number
				proj: number
				msg: string
				position: string
			} = {
				type: req.body.type,
				proj: results[0].id,
				msg: req.body.msg,
				position: req.body.position,
			}
			db.query(sql, data, (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('插入失败!', 400)
				}
				res.cc('插入成功！', 200)
			})
		})
	},
	queryexceptionData(req, res) {
		let sql = ''
		if (req.query.type) {
			sql
				= ' SELECT id,type,msg,position FROM exception_data  WHERE proj=? AND type=? LIMIT ?,? '
			db.query(
				sql,
				[
					req.query.id,
					req.query.type,
					req.query.page ? (req.query.page + 1 - 1) * req.query.limit : 0,
					req.query.limit ? req.query.limit : 10,
				],
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.length === 0) {
						return res.cc('暂无数据！', 400)
					}

					res.send({
						code: 200,
						message: '查询性能数据成功！',
						data: results,
					})
				},
			)
		}
		else {
			sql
				= 'SELECT id,type,msg,position FROM exception_data  WHERE proj=?  LIMIT ?,? '
			db.query(
				sql,
				[
					req.query.id,
					req.query.page ? (req.query.page + 1 - 1) * req.query.limit : 0,
					req.query.limit ? req.query.limit : 10,
				],
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.length === 0) {
						return res.cc('暂无数据！', 400)
					}

					res.send({
						code: 200,
						message: '查询性能数据成功！',
						data: results,
					})
				},
			)
		}
	},
}
export default project
