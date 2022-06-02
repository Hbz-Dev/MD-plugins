let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastclaim)
    let _timers = (43200000 - __timers)
    let timers = clockString(_timers) 
    let user = global.db.data.users[m.sender]
    if (new Date - global.db.data.users[m.sender].lastclaim > 43200000) {
        conn.reply(m.chat, `_Selamat! Kamu sudah claim harian dan mendapatkan *5000* 💵 Money dan *4* 🥤Potion_`, m)
        user.money += 5000
        user.potion += 4
        user.lastclaim = new Date * 1
    } else conn.reply(m.chat, `Silahkan tunggu 🕛 *${timers}* lagi untuk bisa claim lagi`, m)
}
handler.help = ['claim']
handler.tags = ['rpg']
handler.command = /^(collect|claim)$/i

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
