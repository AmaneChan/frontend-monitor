type Person = {
	addexceptionData(req: any, res: any): void
	queryexceptionData(req: any, res: any): void
}

const project: Person = {
	addexceptionData(req, res) {
		res.send('添加异常数据')
	},
	queryexceptionData(req, res) {
		res.send('查询异常数据')
	},
}
export default project
