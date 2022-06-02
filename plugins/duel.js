let handler = async ( m, { conn, args, command}) => {
  conn.duel = conn.duel ? conn.duel : []
  args.length != 0 ? conn.duel.push(m.mentionedJid ? m.mentionedJid[0] : (args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')) : ""
  let who = conn.duel[0]
  //let kita = conn.duel[m.sender]
  if (command == 'duel' && m.mentionedJid[0] && who !== m.mentionedJid[0]) return m.reply('Masih ada sesi duel di bot ini!\nHarap tunggu selesai!')
  
  let enemy = global.db.data.users[who]
  let user = global.db.data.users[m.sender]
  let count = args[1] && args[1].length > 0 ? Math.min(100, Math.max(parseInt(args[1]), 1)) : Math.min(1)
  let nama = conn.getName(m.sender)

  let randomaku = `${Math.floor(Math.random() * 5)}`.trim()
  let randomkamu = `${Math.floor(Math.random() * 5)}`.trim()
  let Aku = (randomaku * 1)
  let Kamu = (randomkamu * 1)

  let __timers = (new Date - user.lastduel)
  let _timers = (300000 - __timers) 
  let timers = clockString(_timers)

   try {
     if (/duel/.test(command)) {
       if (!who) return m.reply('tag yg ingin di ajak duel!')

     let pler = `@${m.sender.replace(/@.+/, '')} Mengajak duel ${args[0]}\n\nPilih Y Atau No`

       if (new Date - user.lastduel > 300000) {
      conn.send2Button(m.chat, pler, global.wm, `Ya`, `+dya`, `No`, `+dno`, m)
      setTimeout(() => delete conn.duel, 20000)
      } else conn.reply( m.chat, `Kamu Sudah Berduel Tunggu hingga *${timers}*`, m)
     }

     if (/dya/.test(command)) {
     if (!conn.duel[0]) return
     let kenal = who.includes(m.sender)
     if (!kenal) return conn.sendButton(m.chat, `Kamu siapa?\nkok ikut ikut mau duel`, `Sesion`, `YA`, `.dya`, m)
     user.lastduel = new Date * 1
     //await clearTimeout(tme)
     await conn.reply(m.chat, '*Duel Dimulaii!*', m)
     if (Aku > Kamu) {
       user.money -= 900
       enemy.money += 900
       delete conn.duel
       conn.reply(m.chat, `@${who.split("@")[0]} Menang Gelud🤼\n*Hadiah:*\n900 Money🏅`.trim(), m, { mentions: [who] })
     } else if (Aku < Kamu) {
       user.money += 450
       enemy.money -= 450
       delete conn.duel
       conn.reply(m.chat, `@${who.split("@")[0]} Kalah Gelud🤼\n*Hadiah:*\n450 Money🥉`.trim(), m, { mentions: [who] })
     } else {
       user.money += 250
       enemy.money += 250
       delete conn.duel
       conn.reply(m.chat, `@${who.split("@")[0]}\n *Seri*\n Masing Masing Mendapatkan 250 Money🎗`.trim(), m, { mentions: [who] })
     }
   }
   if (/dno/.test(command)) {
   if (!conn.duel[0]) return
   let kenal = who.includes(m.sender)
   if (!kenal) return conn.sendButton(m.chat, `Kamu siapa?\nkok ikut ikut mau duel`, `Sesion`, `NO`, `.dno`, m)
    //if (!who) return m.reply('tag yg ingin di ajak duel!')
    //await clearTimeout(tme)
    conn.reply( m.chat, `@${who.split("@")[0]} Membatalkan Ajakan Duel\nDuel Dihentikan!`, m, { mentions: [who] })
    delete conn.duel
   }
 } catch (e) {
   //return conn.sendButton( m.chat, `Sepertinya ada bug`, `laporkan ke owner`, `Kanjut Badag`, `+bug duel ${e.stack}`, m)
   return m.reply(`${e}`)
 }
}

handler.help = ['duel @tag']
handler.tags = ['rpg']
handler.command = /^(duel|dya|dno)/i
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