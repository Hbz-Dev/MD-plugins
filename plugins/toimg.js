let { webp2png, webp2mp4 } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `balas stiker dengan perintah *${usedPrefix + command}*`
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw `balas stiker dengan perintah *${usedPrefix + command}*`
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (!m.quoted.isAnimated) {
    out = await webp2png(media)
    conn.sendFile(m.chat, out, 'out.png', 'Nih Conversi Ke Gambarnya', m, false, { thumbnail: out })
  } else {
    out = await webp2mp4(media)
    conn.sendFile(m.chat, out, 'out.mp4', 'Nih Conversi ke Videonya', m, false, { thumbnail: out })
  }
}
handler.help = ['toimg']
handler.tags = ['sticker']
handler.command = ['toimg']
module.exports = handler
