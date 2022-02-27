let handler = m => m

handler.all = async function (m) {
    if (!db.data.settings.antispam) return // antispam aktif?
    if (m.fromMe || !m.message) return
    if (db.data.users[m.sender].banned || db.data.chats[m.chat].isBanned) return
    this.spam = this.spam ? this.spam : {}
    if (m.sender in this.spam) {
        this.spam[m.sender].count++
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
            if (this.spam[m.sender].count > 10) {
                db.data.users[m.sender].banned = true
                await this.sendButton(m.chat, `kamu dibanned karena spam!`, global.wm, 'pemilik bot', '.owner', m)
                await this.sendButton(global.owner[1], `*spam*\n\n@${m.sender.split`@`[0]}`, global.wm, 'unban', '.unban ' + m.sender.split`@`[0])
            }
            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
        }
    }
    else this.spam[m.sender] = {
        jid: m.sender,
        count: 0,
        lastspam: 0
    }
}

module.exports = handler