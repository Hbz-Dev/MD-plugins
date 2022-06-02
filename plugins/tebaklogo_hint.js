let handler = async (m, { conn }) => {
    conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {}
    let id = m.chat
    if (!(id in conn.tebaklogo)) throw false
    let json = conn.tebaklogo[id][1]
    conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/g, '_') + '```\nBalas gambarnya, bukan pesan ini', conn.tebaklogo[id][0])
}
handler.command = /^telog$/i
handler.limit = true
module.exports = handler
