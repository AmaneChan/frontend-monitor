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
