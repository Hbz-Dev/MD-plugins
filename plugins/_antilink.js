let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink && !isAdmin && m.isGroup) {
    let thisGroup;
    if (/^.*(izin|min|admn)/i.test(m.text)) return m.reply('Izin share link diterima!')
    if (isBotAdmin) thisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    else thisGroup = 0
    if (m.text.includes(thisGroup) && thisGroup !== 0) throw !0 // jika link grup itu sendiri gak dikick
    await this.sendButton(m.chat, `*Link Grup Terdeteksi!*${isBotAdmin ? '' : '\n\Jadikan Bot Sebagai Admin agar bisa kick!'}${global.db.data.settings.auto && isBotAdmin ? '\n*Kamu Akan Dikick Dari Grup!!*' : ''}\n\nKetik *.off antilink* Untuk Mematikan Antilink`, global.wm, 'Off Antilink', ',0 antilink', m)
    if (global.db.data.settings.auto) {
      if (isBotAdmin) this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
  }
  return !0
}

module.exports = handler