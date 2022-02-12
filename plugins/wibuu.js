let fs = require('fs')
let handler = async (m) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let stc = fs.readFileSync('./src/wibu.webp')
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: fs.readFileSync('./media/ku.jpg'), surface: 200, message: `Ada wibu :v`, orderTitle: 'Centauri', sellerJid: '0@s.whatsapp.net'}}}
conn.sendImageAsSticker(m.chat, stc, ftroli, { packname: 'Wibuu🗿', author: 'Lariii ada wibuu', fileLength: 99999999 })
}

handler.customPrefix = /wibu|vvibu|Wibu|WIBU|VVIBU|VVibu/
handler.command = new RegExp

module.exports = handler