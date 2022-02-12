let handler = async (m, { conn, text }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await conn.groupParticipantsUpdate(m.chat, [users], 'remove')
    m.reply('Sukses Mengeluarkan User!')
}
handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^(kick)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler