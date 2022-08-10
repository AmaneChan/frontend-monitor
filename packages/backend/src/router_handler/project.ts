type Person = {
	addProject(req: any, res: any): void
	queryProject(req: any, res: any): void
	alterProject(req: any, res: any): void
}

const project: Person = {
	addProject(req, res) {
		res.send('添加项目')
	},
	queryProject(req, res) {
		res.send('获取项目')
	},
	alterProject(req, res) {
		res.send('修改项目')
	},
}
export default project
