let handler = async (m, { conn, text }) => {
    let id = text ? text : m.chat
    await conn.reply(id, 'Byee bot akan keluar')
    conn.groupLeave(id)
}

handler.help = ['leavegc <id>']
handler.tags = ['owner']
handler.command = /^leavegc$/i

handler.owner = true

module.exports = handler