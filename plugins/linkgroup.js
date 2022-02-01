let handler = async (m, { conn, args }) => {
  let group = args[0] ? args[0] : m.chat
  m.reply('*Link Group ini*\n\nhttps://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = true

handler.fail = null

module.exports = handler
