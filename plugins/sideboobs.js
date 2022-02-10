let fetch = require('node-fetch')
     let handler  = async (m, { conn, usedPrefix, command }) => {
     	if (!db.data.chats[m.chat].nsfw && m.isGroup) throw global.nsfw
     json = await fetch('https://meme-api.herokuapp.com/gimme/sideboobs')
   conn.sendButtonImg(m.chat, json.img, json.title, global.wm, '➡️ Next', `${usedPrefix + command}`, m)
}
handler.help = ['sideboobs']
handler.tags = ['nsfw']
handler.command = /^sideboobs$/i
handler.nsfw = true
handler.limit = true
module.exports = handler