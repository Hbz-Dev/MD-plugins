const fetch = require("node-fetch");
const { sticker } = require('../lib/sticker')
const { stickerTelegram } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {  
    let packName = args[0].replace("https://t.me/addstickers/", "")
    let gas = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
    if (!gas.ok) throw eror
    let json = await gas.json()
    await m.reply(`*Total Stiker:* _${json.result.stickers.length}_`)
    if (m.isGroup && json.result.stickers.length > 20) {
    m.reply(`Jumlah Stiker lebih dari 20, bot akan mengirimkannya Di private chat`)
    for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].thumb.file_id
        let gasIn = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
        let jisin = await gasIn.json()
        let stiker = await sticker(false, "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path, global.packname, global.author)
        await conn.sendFile(m.sender, stiker, '','')
        await delay(1500)
    }
  } else {
        for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].thumb.file_id
        let gasIn = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
        let jisin = await gasIn.json()
        let stiker = await sticker(false, "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, '','')
        await delay(1500)
       }
     }
  } else if (args && args.join(' ')) {
		let [query, page] = args.join(' ').split('|')
		let res = await stickerTelegram(query, page)
		conn.reply(m.chat, res.map(v => `*${v.title}*\n_${v.link}_`).join('\n\n'), m)
  } else m.reply('Tidak ada Query!')
}
handler.help = ['stikertele <url>']
handler.tags = ['sticker']
handler.command = /^(stic?kertele(gram)?)$/i

handler.limit = 1

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))