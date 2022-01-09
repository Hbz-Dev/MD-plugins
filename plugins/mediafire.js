let { mediafireDownloader } = require('../lib/downloader')
let util = require('util')

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `uhm.. urlnya mana?\n\npenggunaan:\n${usedPrefix + command} url\ncontoh:\n${usedPrefix + command} http://www.mediafire.com/file/js0gr2nozcmk9yg/example.txt/file`
    let anu = await mediafireDownloader(text)
                if (anu.filesize.split("MB")[0] >= 20.00) return m.reply('File Melebihi Batas '+util.format(result))
                //else if (Number(anu.filesize.includes("GB"))) return m.reply('File Melebihi Batas '+util.format(result))
		        conn.reply(m.chat, util.format(anu), m)
    await conn.sendFile(m.chat, anu.link, anu.title, wm, m)
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i

handler.limit = 25

module.exports = handler
