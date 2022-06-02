let handler = m => m

handler.before = async function (m, { match }) {
    // if (match) return !1
    if (!m.chat.endsWith('@s.whatsapp.net')) return !0
    this.anonymous = this.anonymous ? this.anonymous : {}
    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
    if (room) {
        if (/^.*(next|leave|start|sendkontak)/.test(m.text)) return
        if (['.next', '.sendkontak', '.sendcontact', '.leave', '.start', 'Cari Partner', 'Keluar', 'Next', 'Leave'].includes(m.text)) return
        let other = [room.a, room.b].find(user => user !== m.sender)
        if (m.msg.mimetype) {
         conn.sendFile(other, await conn.link(m), '', m.text, m.quoted ? { key: { fromMe: true, remoteJid: other }, message: { conversation: m.quoted.text }} : null)
        } else {
        conn.sendMessage(other, { text: m.text }, { quoted: m.quoted ? { key: { fromMe: true, remoteJid: other }, message: { conversation: m.quoted.text }} : null })
        //m.copyNForward(other, true, {})
      }
    }
    return !0
}

module.exports = handler