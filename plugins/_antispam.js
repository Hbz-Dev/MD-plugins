let handler = m => m

handler.all = async function (m) {
    if (global.db.data.settings.antispam) {
            if (!m.message) return
            this.spam = this.spam ? this.spam : {}
            if (!(m.sender in this.spam)) {
                let spamming = {
                    jid: m.sender,
                    spam: 0,
                    lastspam: 0
                }
                this.spam[spamming.jid] = spamming
            } else try {
                this.spam[m.sender].spam++
                if (new Date - this.spam[m.sender].lastspam > 4000) {
                    if (this.spam[m.sender].spam > 8) {
                        this.spam[m.sender].spam = 0
                        this.spam[m.sender].lastspam = new Date * 1
                        db.data.users[m.sender].banned = true
                await this.sendButton(m.chat, `kamu dibanned karena spam!`, global.wm, 'pemilik bot', '.owner', m)
                await this.sendButton(`${global.owner[1]}`, `*spam*\n\n@${this.spam[m.sender].jid.split("@")[0]}`, global.wm, 'unban', '.unban ' + this.spam[m.sender].jid.split("@")[0] )
                    } else {
                        this.spam[m.sender].spam = 0
                        this.spam[m.sender].lastspam = new Date * 1
                    }
                }
            } catch (err) {
                m.reply(`${err.message}`)
            }
        }
   }

module.exports = handler