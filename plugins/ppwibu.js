let fetch = require('node-fetch')     
let handler  = async (m, { conn, args }) => {
     let fg = await fetch(`https://nekos.life/api/v2/img/avatar`)
     //conn.sendFile(m.chat, kk.url, 'avatar.jpg', 'avatarnya kak', m, false)
     conn.sendButtonImg(m.chat, fg.url, `Avatarnya Kak ${m.sender.split('@')[0]}`, global.wm, 'Avatar Lagi', '.ppwibu', m)
}
handler.help = ['ppwibu']
handler.tags = ['anime']
handler.command = /^ppwibu$/i
module.exports = handler