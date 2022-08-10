type Person = {
	addVisit(req: any, res: any): void
	queryVisit(req: any, res: any): void
	addstay(req: any, res: any): void
	querystay(req: any, res: any): void
}

const pageVisit: Person = {
	addVisit(req, res) {
		res.send('用户页面访问')
	},
	queryVisit(req, res) {
		res.send('查询访问记录')
	},
	addstay(req, res) {
		res.send('用户停留时间')
	},
	querystay(req, res) {
		res.send('查询用户停留记录')
	},
}
export default pageVisit
