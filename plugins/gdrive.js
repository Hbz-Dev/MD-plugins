let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `uhm.. link nya mana?\n\ncontoh:\n${usedPrefix + command} https://drive.google.com/file/d/13zpT0qU8ltML-QzMTOu0ZlOnFlC8dVSM/view?usp=drivesdk`
    let res = await GDriveDl(args[0])
    if (!res) throw res
    //conn.sendFile(m.chat, res.download, `GDrive.${res.mimetype.split('/')[1]}`, `Filename: ${res.fileName}\nMimetype: ${res.mimetype}`, m)
    await m.reply(`${require('util').format(res)}`)
    conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
}
handler.help = ['drive <link>']
handler.tags = ['downloader']
handler.limit = 1

handler.command = /^gd|drive|googledrive/i
module.exports = handler

let fetch = require('node-fetch')
let { sizeFormatter } = require('human-readable')
let formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})
async function GDriveDl(url) {
	let id
	if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
	id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
	if (!id) throw 'ID Not Found'
	let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
		method: 'post',
		headers: {
			'accept-encoding': 'gzip, deflate, br',
			'content-length': 0,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'origin': 'https://drive.google.com',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
			'x-drive-first-party': 'DriveWebUi',
			'x-json-requested': 'true' 
		}
	})
	let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
	if (!downloadUrl) throw 'Link Download Limit Exceed!'
	let data = await fetch(downloadUrl)
	if (data.status !== 200) throw data.statusText
	return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
}