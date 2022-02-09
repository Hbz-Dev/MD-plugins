let { MessageType } = require('@adiwajshing/baileys-md')
let fs = require('fs')

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
  try {
    global.db.data.users[m.sender].lastbansos = global.db.data.users[m.sender].lastbansos || 0
    let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
    let randomkamu = `${Math.floor(Math.random() * 86)}`.trim() //hehe Biar Susah Menang :v
    let Aku = (randomaku * 1)
    let Kamu = (randomkamu * 1)
    let kbansos = fs.readFileSync('./src/kbansos.jpg')
    let mbansos = fs.readFileSync('./src/mbansos.jpg')
    let __timers = (new Date - global.db.data.users[m.sender].lastbansos)
    let _timers = (604800000 - __timers) 
    let timers = clockString(_timers)
    let user = global.db.data.users[m.sender]
    if (new Date - global.db.data.users[m.sender].lastbansos > 300000) {
      if (Aku > Kamu) {
        conn.sendButtonLoc(m.chat, kbansos, `Kamu Tertangkap Setelah Kamu korupsi dana bansos🕴️💰,  Dan kamu harus membayar denda 20000 Money💵`, `${wm}`, 'Cek Money', '.inv')
        user.money -= 20000
        global.db.data.users[m.sender].lastbansos = new Date * 1
      } else if (Aku < Kamu) {
        user.money += 25000
        conn.sendButtonLoc(m.chat, mbansos, `Kamu berhasil  korupsi dana bansos🕴️💰,  Dan kamu mendapatkan 25000 Money💵`, `${wm}`, 'Cek Money', '.inv')
        global.db.data.users[m.sender].lastbansos = new Date * 1
      } else {
        conn.sendButton( m.chat, `Sorry Gan Kamu Tidak Berhasil Korupsi bansos Dan Tidak masuk penjara karna kamu *melarikan diri🏃*`, `Mengsad :<\n${wm}`, `Kembali`, `${usedPrefix}menu`, m)
        global.db.data.users[m.sender].lastbansos = new Date * 1
      }
    } else conn.sendButton(m.chat, `Kamu sudah Melakukan Korupsi Bansos 💰\nDan kamu harus menunggu selama\n▸ 🕓 *${timers}*`, `${wm}`, `⋮☰ Menu`, `${usedPrefix}menu`, m)
  } catch (e) {
    throw `${e}`
  }
}

handler.help = ['bansos']
handler.tags = ['rpg']
handler.command = /^(bansos|korupsi)$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
