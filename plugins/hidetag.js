let handler = async(m, { conn, text, participants }) => {
  let teks = m.quoted ? m.quoted.text : text
  let mens = []
  for (let i of participants) {
    mens.push(i.id)
   }
  conn.reply(m.chat, teks, null, { mentions: mens })
}
handler.help = ['hidetag <pesan>']
handler.tags = ['group']
handler.command = /^(hidetag|hdtg)$/i

handler.group = true
handler.admin = true

module.exports = handler
