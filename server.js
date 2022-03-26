let express = require('express')
let fetch = require('node-fetch')

function connect(PORT) {
    let app = global.app = express()
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(PORT, () => {
    	keepAlive()
    	console.log('App listened on port', PORT)
    })
}

function keepAlive() {
	const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
	if (/(\/\/|\.)undefined\./.test(url)) return
	setInterval(() => {
		fetch(url).catch(console.log)
	}, 15_000)
}

module.exports = connect
