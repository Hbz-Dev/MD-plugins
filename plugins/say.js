let handler = async (m, { conn, text }) => {
  if (!text) return `Uhm.. Textnya mana?\nContoh .say ${wm}`
  m.reply(text, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.command = /^say$/i

module.exports = handler