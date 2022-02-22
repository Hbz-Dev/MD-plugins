let fetch = require('node-fetch')
     let handler  = async (m, { conn, usedPrefix, command }) => {
     let json = await (await fetch('https://meme-api.herokuapp.com/gimme/sideboobs')).json()
     let prev = json.preview[Math.floor(Math.random() * json.preview.length)]
     conn.sendButtonImg(m.chat, prev, `${json.title}\n\n${json.spoiler ? 'Warning: *SPOILER ALERT*' : ''}`, `Author: ${json.author}\n${wm}`, '➡️ Next', `${usedPrefix + command}`, m)
}
handler.help = ['sideboobs']
handler.tags = ['nsfw']
handler.command = /^sideboobs$/i
handler.nsfw = true
handler.limit = true
module.exports = handler