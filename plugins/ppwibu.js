let fetch = require('node-fetch')     
let handler  = async (m, { conn, args }) => {
     let fg = await (await fetch(`https://nekos.life/api/v2/img/avatar`)).json()
     //conn.sendFile(m.chat, kk.url, 'avatar.jpg', 'avatarnya kak', m, false)
     conn.sendButtonImg(m.chat, fg.url, `Nih Avatarnya Kak`, global.wm, 'Avatar Lagi', '.ppwibu', m)
}
handler.help = ['ppwibu']
handler.tags = ['anime']
handler.command = /^ppwibu$/i

module.exports = handler