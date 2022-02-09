let fs = require('fs')
let handler = async (m) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let stc = fs.readFileSync('./src/wibu.webp')
conn.sendImageAsSticker(m.chat, stc, m, { packname: 'Wibuu🗿', author: 'Lari Cuk Ada Wibuu', fileLength: 10000 })
}

handler.customPrefix = /wibu|vvibu|Wibu|WIBU|VVIBU|VVibu/
handler.command = new RegExp

module.exports = handler