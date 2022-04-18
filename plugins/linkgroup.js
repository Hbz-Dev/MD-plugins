let handler = async (m, { conn, args }) => {
  let group = args[0] ? args[0] : m.chat
  m.reply('*Link Group ini*\n\nhttps://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.group = true
handler.botAdmin = true
module.exports = handler
