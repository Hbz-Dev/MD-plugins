let handler = async (m, { conn, text }) => {

  if (!text) throw 'Text nya mana?'
  await conn.groupUpdateSubject(m.chat, text)
  conn.reply(m.chat, `Sukses Mengganti nama grup menjadi\n${text}`, m)
}
handler.help = ['setsubject <text>']
handler.tags = ['group']
handler.command = /^setsubject$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler
