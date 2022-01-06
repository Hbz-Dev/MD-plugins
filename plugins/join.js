let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
    let [_, code] = text.match(linkRegex) || []
    if (!code) throw 'Link Salah'
    await conn.groupAcceptInvite(code)
    .then((rus) => m.reply(rus.toString())).catch((err) => m.reply(err.toString()))
}

handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['owner']
handler.command = /^join$/i

handler.owner = true
handler.premium = false

module.exports = handler