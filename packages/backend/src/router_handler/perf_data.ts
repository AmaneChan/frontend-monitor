type Person = {
	addperfData(req: any, res: any): void
	queryperfData(req: any, res: any): void
}

const project: Person = {
	addperfData(req, res) {
		res.send('添加性能数据')
	},
	queryperfData(req, res) {
		res.send('查询性能数据')
	},
}
export default project
