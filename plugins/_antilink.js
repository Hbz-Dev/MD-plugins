let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat];
  let ValidLink = (m.text.includes('https://') || m.text.includes('http://'))
  if (chat.antiLink && ValidLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}` : 0
    if (m.text.includes(thisGroup) && thisGroup != 0) throw false // jika link grup itu sendiri gak dikick
    await conn.reply(m.chat, `*Link Terdeteksi!*${isBotAdmin ? '' : '\n\nBot Bukan admin Tidak bisa mengkick!'}\n\nKetik *.off antilink* untuk mematikan fitur ini${opts['restrict'] ? '' : '\nketik *.on restrict* supaya bisa kick'}`, m)
  }
  return true
}

module.exports = handler
