let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. link nya mana?\n\ncontoh:\n${usedPrefix + command} https://drive.google.com/file/d/13zpT0qU8ltML-QzMTOu0ZlOnFlC8dVSM/view?usp=drivesdk`
    let res = await GDriveDl(text)
    conn.sendFile(m.chat, res.download, `GDrive.${res.mimetype.split('/')[1]}`, `Filename: ${res.fileName}\nMimetype: ${res.mimetype}`, m)
}
handler.help = ['drive <link>']
handler.tags = ['downloader']
handler.limit = 1

handler.command = /^gd|drive|googledrive/i
module.exports = handler

let fetch = require('node-fetch')
async function GDriveDl(url) {
	let id
	if (url && url.match(/drive\.google/i)) {
		id = url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//)
		if (id) {
			let res = await fetch(`https://drive.google.com/uc?export=view&id=${id[1]}`)
			if (!res.ok) throw await res.text()
			let fileName = res.headers.get('content-disposition').slice(16).split(';')[0]
			let mimetype = res.headers.get('content-type')
			let download = res.url
			return { download, fileName, mimetype }
		} else throw false
	} else throw 'Invalid URL'
}