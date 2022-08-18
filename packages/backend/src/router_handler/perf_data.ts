import db from '../db/index.js'

interface Person {
	addperfData(req: any, res: any): void
	queryperfData(req: any, res: any): void
}

const project: Person = {
	addperfData(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('key值错误等!', 400)
			}
			const sql = 'INSERT INTO perf_data SET ?'
			const data: {
				type: number
				proj: number
				from: string
				value: number
			} = {
				type: req.body.type,
				proj: results[0].id,
				from: req.body.from,
				value: req.body.value,
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
	queryperfData(req, res) {
		const sql
			= ' SELECT `from`, value FROM perf_data  WHERE proj=? AND type=? LIMIT ?,? '
		db.query(
			sql,
			[
				req.query.id,
				req.query.type,
				(req.query.page + 1 - 1) * req.query.limit,
				req.query.limit,
			],
			(err, results1) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results1.length === 0) {
					return res.cc('暂无数据！', 400)
				}
				const sql = 'SELECT value FROM perf_data WHERE proj=? AND type=?'
				let avg = 0
				db.query(sql, [req.query.id, req.query.type], (err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.length !== 0) {
						let add = 0
						for (let i = 0; i < results.length; i++) {
							add += results[i].value
						}
						console.log(add)
						avg = add / results.length
						res.send({
							code: 200,
							message: '查询性能数据成功！',
							data: {
								avg,
								list: results1,
							},
						})
					}
				})
			},
		)
	},
}
export default project
