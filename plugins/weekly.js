let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let _timers = (604800000 - (new Date - user.lastweekly))
    let timers = clockString(_timers) 
    if (new Date - user.lastweekly > 604800000) {
        conn.reply(m.chat, `Anda sudah mengklaim dan mendapatkan\n20000 💵 Money\n3 🎁 Legendary crate\n5 📦 Mythic crate`, m)
        user.money += 25000
        user.legendary += 3
        user.mythic += 5
        user.lastweekly= new Date * 1
    } else {
        conn.sendButton(m.chat, `silahkan tunggu *🕒${timers}* lagi untuk bisa mengclaim lagi`, 'Weekly RPG', 'Gajian', '.gajian', m)
        //conn.sendMessage(m.chat, buttons, MessageType.buttonsMessage, { quoted: m })
    }
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i
handler.register = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
