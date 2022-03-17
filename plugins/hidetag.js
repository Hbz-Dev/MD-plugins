let handler = async(m, { conn, text, participants }) => {
  let mens = []
  for (let i of participants) {
    mens.push(i.id)
   }
  let mime = m.quoted ? m.quoted.mimetype : ''
  if (/webp/.test(mime)) {
  let stik = await m.quoted.download()
  return conn.sendFile(m.chat, stik, 'tag.webp', '', null, false, { asSticker: true, mentions: mens })
  } else {
  let teks = m.quoted ? m.quoted.text : text
  conn.reply(m.chat, teks, null, { mentions: mens })
 }
}
handler.help = ['hidetag <pesan>']
handler.tags = ['group']
handler.command = /^(hidetag|hdtg)$/i

handler.group = true
handler.admin = true

module.exports = handler
