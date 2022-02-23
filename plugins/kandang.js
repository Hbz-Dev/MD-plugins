let handler = async (m, { conn, usedPrefix }) => { 
  let banteng = global.db.data.users[m.sender].banteng
  let harimau = global.db.data.users[m.sender].harimau
 let gajah = global.db.data.users[m.sender].gajah
let kambing = global.db.data.users[m.sender].kambing
let panda = global.db.data.users[m.sender].panda
 let buaya = global.db.data.users[m.sender].buaya
 let kerbau = global.db.data.users[m.sender].kerbau
let sapi = global.db.data.users[m.sender].sapi
 let monyet = global.db.data.users[m.sender].monyet
 let babihutan = global.db.data.users[m.sender].ikan
 let babi = global.db.data.users[m.sender].lele
 let ayam = global.db.data.users[m.sender].ayam

let zer = `
*—「 KANDANG 🐾 」—*
    
 *◩   ️ 🐂 = [ ${banteng} ] Ekor Banteng*
 *◩   ️ 🐅 = [ ${harimau} ] Ekor Harimau*
 *◩   ️ 🐘 = [ ${gajah} ] Ekor Gajah*
 *◩   ️ 🐐 = [ ${kambing} ] Ekor Kambing*
 *◩   ️ 🐼 = [ ${panda} ] Ekor Panda*
 *◩   ️ 🐊 = [ ${buaya} ] Ekor Buaya*
 *◩   ️ 🐃 = [ ${kerbau} ] Ekor Kerbau*
 *◩   ️ 🐮 = [ ${sapi} ] Ekor Sapi*
 *◩   ️ 🐒 = [ ${monyet} ] Ekor Monyet*
 *◩   ️ 🐟 = [ ${babihutan} ] Ekor Ikan*
 *◩   ️ 🐠 = [ ${babi} ] Ekor Lele*
 *◩   ️ 🐓 = [ ${ayam} ] Ekor Ayam*
 `.trim()
 conn.sendButton(m.chat, zer, global.wm, 'Toko', '.shop', m)
} 
handler.help = ['kandang']
handler.tags = ['rpg']
handler.command= /^(kandang)$/i
handler.register = true
handler.group = 1

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)