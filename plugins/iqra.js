let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`Example : #iqra 3\n\nIQRA Yang tersedia : 1,2,3,4,5,6`)
  //conn.sendFile(m.chat, , `iqra${text}.pdf`, null, m, { fileName: `Pdf Iqra ${text}` })
 conn.sendMessage(m.chat, { document: { url: `https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${text}` }, fileName: `Buku Iqra ${text}`, mimetype: 'application/pdf' }, { quoted: m })
}
handler.help = ['iqra <angka>']
handler.tags = ['internet']

handler.command = /^iqra$/i

module.exports = handler
