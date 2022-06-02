const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*telog/i.test(m.quoted.contentText)) return !0
  this.tebaklogo = this.tebaklogo ? this.tebaklogo : {}
  if (m.quoted.id == this.tebaklogo[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tebaklogo[id][1]))
    if (['.telog', 'Bantuan', ''].includes(m.text)) return !0
    if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
      global.db.data.users[m.sender].exp += this.tebaklogo[id][2]
      await this.sendButton(m.chat, `*Benar!* +${this.tebaklogo[id][2]} XP`, 'Play again? [limit]', 'Tebak Logo', '.tebaklogo', m)
      clearTimeout(this.tebaklogo[id][3])
      delete this.tebaklogo[id]
    } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler
