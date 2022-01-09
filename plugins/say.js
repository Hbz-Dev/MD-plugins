let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `uhm. teksnya mana?\n\ncontoh:\n${usedPrefix + command} halo`
    conn.reply(m.chat, text, m)
}
handler.command = /^(say)$/i

module.exports = handler