let fetch = require('node-fetch')
     let handler  = async (m, { conn, usedPrefix, command }) => {
     let json = await (await fetch('https://meme-api.herokuapp.com/gimme/sideboobs')).json()
     conn.sendButtonImg(m.chat, json.img, json.title, global.wm, '➡️ Next', `${usedPrefix + command}`, m)
}
handler.help = ['sideboobs']
handler.tags = ['nsfw']
handler.command = /^sideboobs$/i
handler.nsfw = true
handler.limit = true
module.exports = handler