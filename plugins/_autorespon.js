let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? 'Bot lagi cape (・へ・)' : banned ? 'Kamu Dibanned' : 'Bot disini （ ・∀・）',
                '',
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : '⋮☰ Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.menu',
                m.isGroup ? 'Owner' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.owner' : isBanned ? '.unban' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // salam
    let reg = /(terima?kasih|makasih|maacih|tengkyuh)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`Sama-sama, , （ ・∀・）`)
    }
    
}

module.exports = handler