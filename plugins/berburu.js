let { MessageType } = require('@adiwajshing/baileys-md')
let handler = async (m, { conn }) => {
    if (global.db.data.users[m.sender].stamina < 40) return conn.sendButton(m.chat, 'Stamina mu tidak cukup untuk berburu!\nSilakan masak makanan dan Memakan makanannya agar stamina mu kembali!', `Tekan tombol dibawah untuk memeriksa inventory anda!\n${wm}`, 'Periksa Inv', '.inv', m)
    let __timers = (new Date - global.db.data.users[m.sender].lasthunt)
    let _timers = (500000 - __timers)
    let timers = clockString(_timers) 
    let user = global.db.data.users[m.sender]
    let buttons = [
{buttonId: '.kandang', buttonText: {displayText: 'Kandang 🐾'}, type: 1}, 
]
const buttonMessage = {
    text: `📍 Sepertinya Kamu Sudah Kecapekan\nSilahkan Istirahat dulu Untuk melanjutkan berburu !\n🕖 *${timers}*`,
    footer: `${wm}`, 
    buttons: buttons,
    headerType: 1
}
    if (new Date - global.db.data.users[m.sender].lasthunt > 500000) {
let zero1 = `${Math.floor(Math.random() * 7) * 1}`
let zero2 = `${Math.floor(Math.random() * 7) * 1}`
let zero4 = `${Math.floor(Math.random() * 7) * 1}`
let zero3 = `${Math.floor(Math.random() * 7) * 1}`
let zero5 = `${Math.floor(Math.random() * 7) * 1}`
let zero6 = `${Math.floor(Math.random() * 7) * 1}`
let zero7 = `${Math.floor(Math.random() * 7) * 1}`
let zero8 = `${Math.floor(Math.random() * 7) * 1}`
let zero9 = `${Math.floor(Math.random() * 7) * 1}`
let zero10 = `${Math.floor(Math.random() * 7) * 1}`
let zero11 = `${Math.floor(Math.random() * 7) * 1}`
let zero12 = `${Math.floor(Math.random() * 7) * 1}`
let heal = `${Math.floor(Math.random() * 40)}`
.trim()

hsl = `*━━━━━━━━━[ Hasil Berburu]━━━━━━━━━*

 *🐂 = [ ${zero1} ]*			 *🐃 = [ ${zero7} ]*
 *🐅 = [ ${zero2} ]*			 *🐮 = [ ${zero8} ]*
 *🐘 = [ ${zero3} ]*			 *🐒 = [ ${zero9} ]*
 *🐐 = [ ${zero4} ]*			 *🐗 = [ ${zero10} ]*
 *🐼 = [ ${zero5} ]*			 *🐖 = [ ${zero11} ]*
 *🐊 = [ ${zero6} ]*			 *🐓 = [ ${zero12} ]*

Berkurang -${heal} Stamina
Tersisa [${user.stamina} / 100]
`
global.db.data.users[m.sender].banteng += zero1
global.db.data.users[m.sender].harimau += zero2
global.db.data.users[m.sender].gajah += zero3
global.db.data.users[m.sender].kambing += zero4
global.db.data.users[m.sender].panda+= zero5
global.db.data.users[m.sender].buaya += zero6
global.db.data.users[m.sender].kerbau += zero7
global.db.data.users[m.sender].sapi += zero8
global.db.data.users[m.sender].monyet += zero9
global.db.data.users[m.sender].babihutan += zero10
global.db.data.users[m.sender].babi += zero11
global.db.data.users[m.sender].ayam += zero12
global.db.data.users[m.sender].stamina -= heal * 1

setTimeout(() => {
                     conn.sendButton(m.chat, hsl, wm, 'Kandang', '#kandang',m)
                     }, 20000) 
               
                     setTimeout(() => {
                     m.reply(`*DUAR*`)
                      }, 18000)
                    
                     setTimeout(() => {
                     m.reply('KPUMNN !!')
                     }, 15000) 
                    
                     setTimeout(() => {
                     m.reply('DORR DORR !!')
                     }, 14000) 
                     
                     setTimeout(() => {
                     m.reply('_Sedang Berburu..._')
                     }, 0) 
  user.lasthunt = new Date * 1
    } else conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}
handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(berburu)$/i
handler.register = true

module.exports = handler
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}