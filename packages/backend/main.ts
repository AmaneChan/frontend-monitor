import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
	res.send('HelloWorld2333')
})

app.listen(PORT, () => {
	console.log('Server started')
})
