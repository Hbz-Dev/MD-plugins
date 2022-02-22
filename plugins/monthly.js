let { MessageType } = require('@adiwajshing/baileys-md')

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let _timers = (2592000000 - (new Date - user.lastmonthly))
    let timers = clockString(_timers) 
    if (new Date - user.lastmonthly > 2592000000) {
        conn.reply(m.chat, `Anda sudah mengklaim dan mendapatkan 100000 💵 Money, 🎁 5 Legendary crate dan 3 🐕 Pet crate`, m)
        user.money += 100000
        user.legendary += 5
        user.pet += 3
        user.lastmonthly = new Date * 1
    } else {
        conn.sendButton(m.chat, `silahkan tunggu *🕛${timers}* lagi untuk bisa mengclaim lagi`, 'Monthly RPG', 'Weekly', '.weekly', m)
        //conn.sendMessage(m.chat, buttons, { quoted: m })
    }
}
handler.help = ['monthly']
handler.tags = ['rpg']
handler.register = true
handler.command = /^(monthly)$/i

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