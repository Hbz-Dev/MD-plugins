let util = require('util')

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `uhm.. urlnya mana?\n\npenggunaan:\n${usedPrefix + command} url\ncontoh:\n${usedPrefix + command} http://www.mediafire.com/file/js0gr2nozcmk9yg/example.txt/file`
    let anu = await mediafireDownloader(text)
                if (anu.filesize.split("MB")[0] >= 50.00) return m.reply('File Melebihi Batas '+util.format(anu))
                //else if (Number(anu.filesize.includes("GB"))) return m.reply('File Melebihi Batas '+util.format(result))
		        await conn.reply(m.chat, util.format(anu), m)
                conn.sendFile(m.chat, anu.link, anu.title, '', m)
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i

handler.limit = 1

module.exports = handler

let axios = require('axios')
let cheerio = require('cheerio')
function mediafireDownloader(url) {
    return new Promise(async (resolve, reject) => {
        axios.get(url).then(({ data }) => {
            const $ = cheerio.load(data)
            link = $('a#downloadButton').attr('href')
            filesize = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
            seplit = link.split('/')
            title = seplit[5]
            mime = title.split('.')[1]
            resolve({ title, filesize, mime, link })
        })
    })
}
