let handler = m => m
handler.before = async function (m, { conn }) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${clockString(new Date - user.afk)}
`.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user) continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0) continue
        let reason = user.afkReason || ''
        conn.sendButton(m.chat, `
Jangan tag Dia!\n
Dia Sedang AFK ${reason ? 'Dengan alasan: ' + reason : 'Tanpa Alasan'}
Selama ${clockString(new Date - afkTime)}
`.trim(), 'Tinggalkan pesan?', 'Tinggalkan pesan', `.pesan ${jid}`, m)
    }
    return true
}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
