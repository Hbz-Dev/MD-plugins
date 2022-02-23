let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`Example : ${prefix + command} 3\n\nIQRA Yang tersedia : 1,2,3,4,5,6`)
  conn.sendFile(m.chat, `https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${text}`, `iqra${text}.pdf`, null, m)
}
handler.help = ['iqra <angka>']
handler.tags = ['internet']

handler.command = /^iqra$/i

module.exports = handler
