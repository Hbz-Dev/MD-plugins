const fetch = require('node-fetch')
let timeout = 40000
let poin = 15000
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `
  ${json.deskripsi}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hint untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.tebakgambar[id] = [
    await conn.sendButtonImg(m.chat, json.img, caption, `Tebak Gambar\nMade By ${wm}`, 'Bantuan', '.hint', m)
    ,
    json, poin,
    setTimeout(async () => {
      if (conn.tebakgambar[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, 'Play again? [limit]', 'Tebak Gambar', '.tebakgambar', conn.tebakgambar[id][0])
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.game = true
handler.command = /^tebakgambar/i

module.exports = handler