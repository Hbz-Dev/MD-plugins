let { MessageType } = require('@adiwajshing/baileys-md')
let handler = async (m, { conn, usedPrefix, DevMode }) => {
    if (global.db.data.users[m.sender].pickaxe == 0) return m.reply('Kamu tidak memiliki pickaxes Untuk menambang!\nDapatkan dengan cara *#adventure* Atau beli di shop dengan cara *#shop buy pickaxes*')
    if (global.db.data.users[m.sender].stamina < 30) return m.reply('Membutuhkan minimal 30 stamina untuk menambang!\nMakan untuk menambah stamina!')
    try { 
        let __timers = (new Date - global.db.data.users[m.sender].lastmining)
        let _timers = (300000 - __timers) 
        let timers = clockString(_timers)
          if (new Date - global.db.data.users[m.sender].lastmining > 300000) {
            let player = global.db.data.users[m.sender]
            let diamond = `${pickRandom(['1', '0', '1', '0', '1', '0', '2', '0', '5'])}`
            let emerald = `${pickRandom(['1', '0', '1', '0', '1', '0', '2', '0', '5'])}`
            let gold = `${pickRandom(['1', '0', '1', '0', '1', '0', '2', '0', '5'])}`
            let __dmg = `${Math.floor(Math.random() * 25)}`.trim()
            let _dmg = (__dmg * 1)
            let dmg = (diamond == 5 || emerald == 5 || gold == 5 ? pickRandom(['99', '98', '97', '96', '95', '94', '93', '92', '91', '90']) : _dmg)
            player.pickaxedurability -= dmg * 1
            player.lastmining = new Date * 1
            if (player.stamina < 30) {
            m.reply('Membutuhkan minimal 30 stamina untuk menambang!\nMakan untuk menambah stamina!')
            return
            }
            if (player.pickaxedurability < 0) {
            player.pickaxe = 0
            player.pickaxedurability = 0
            m.reply('Pickaxe Anda hancur saat sedang menambang!\nAnda hanya mendapatkan *50 EXP* Dan *5 Kayu*')
            player.exp += 50
            player.stamina -= 15
            player.kayu += 5
            return
            }     
            let kayu =  `${Math.floor(Math.random() * 30)}`.trim() 
            let batu =  `${Math.floor(Math.random() * 20)}`.trim() 
            let iron = `${Math.floor(Math.random() * 20)}`.trim()
            let exp = `${Math.floor(Math.random() * 80)}`.trim() 
            let jaring = `${Math.floor(Math.random() * 20)}`.trim()
            let str = `
↓ Mining:
🪨Stone: ${batu}
🌲Wood: ${kayu}
🔩Iron: ${iron}
🧶String: ${jaring}
⚜️Xp: ${exp}

Berkurang -${dmg} Durability
Tersisa ${player.pickaxedurability}/100
`.trim()
            await conn.sendButton(m.chat, str, 'Mining RPG', 'inventory', '.inv', m)
            if (diamond > 0) {
                 player.diamond += diamond * 1
                 conn.reply(m.chat, '*Selamat kamu menemukan*\n' + diamond + ' Diamond! 💎', m)
               }
            if (emerald > 0) {
                 player.emerald += emerald * 1
                 conn.reply(m.chat, '*Selamat kamu menemukan*\n' + emerald + ' Emerald! 🧬', m)
               }
             if (gold > 0) {
                 player.gold += gold * 1
                 conn.reply(m.chat, '*Selamat kamu menemukan*\n' + gold + ' Gold! 👑', m)
               }
            player.kayu += kayu * 1
            player.stamina -= 30
            player.batu += batu * 1
            player.iron += iron * 1
            player.exp += exp * 1
            player.string += jaring * 1
          } else conn.reply(m.chat, `Please wait *${timers}* again`, m)
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error', m)
        if (DevMode) {
            let file = require.resolve(__filename)
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, file + ' error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
handler.help = ['mine', 'mining']
handler.tags = ['rpg']
handler.command = /^(mine|mining)$/i

handler.register = true
handler.group = true

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