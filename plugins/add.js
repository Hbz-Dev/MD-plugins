let handler = async (m, { conn, text }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await conn.groupParticipantsUpdate(m.chat, [users], 'add')
    //m.reply('Sukses Menambahkan User!')
}
handler.help = ['add @user']
handler.tags = ['group']
handler.command = /^(add)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler