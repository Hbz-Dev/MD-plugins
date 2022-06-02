const fetch = require('node-fetch')
let timeout = 60000
let poin = 15000
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {}
  let id = m.chat
  if (id in conn.tebaklogo) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklogo[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/Aidils60/database/main/logoquizid.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `
  ${json.deskripsi}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}telog untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.tebaklogo[id] = [
    await conn.sendButtonImg(m.chat, json.img, caption, `Tebak Logo\nMade By ${wm}`, 'Bantuan', '.telog', m)
    ,
    json, poin,
    setTimeout(async () => {
      if (conn.tebaklogo[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, 'Play again? [limit]', 'Tebak Logo', '.tebaklogo', conn.tebaklogo[id][0])
      delete conn.tebaklogo[id]
    }, timeout)
  ]
}
handler.help = ['tebaklogo']
handler.tags = ['game']
handler.game = true
handler.command = /^tebaklogo/i

module.exports = handler