let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroup)) throw !0 // jika link grup itu sendiri gak dikick
    await this.sendButton(m.chat, `*Link Grup Terdeteksi!*${isBotAdmin ? '' : '\n\nBot Must Be Admin!'}\n\nType *.off antilink* For turn off antilink}`, wm, 'Disable Antilink', ',0 antilink', m)
    if (global.db.data.settings.auto) {
      if (isBotAdmin) this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
  }
  return !0
}

module.exports = handler