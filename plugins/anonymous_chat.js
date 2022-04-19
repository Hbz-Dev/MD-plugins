async function handler(m, { command, usedPrefix }) {
    if (!global.db.data.settings.anon) return m.reply('Fitur ini tidak diaktifkan Oleh owner!')
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.sendButton(m.chat, '_Kamu tidak sedang berada di anonymous chat_', 'Mau cari patner chating?', 'Start', `${usedPrefix}start`, m)
            this.send2Button(m.chat, '_Kamu meninggalkan room anonymous chat_', 'Mau main anonymous lagi?', 'Ya', `${usedPrefix}start`, 'Tidak', `${usedPrefix}say Ok terimakasih telah menggunakan Anonymous Chat Bot, kalo kamu mau main lagi bisa klik button *Ya* di atas atau bisa ketik *.start*!`, m)
            let other = room.other(m.sender)
            if (other) this.sendButton(other, 'Partner meninggalkan chat...', 'Anonymous chat By '+wm, 'Find Partner', '.start', null)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) throw 'Kamu masih berada di dalam anonymous chat'
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))     
            if (room) {
            let { name, age } = global.db.data.users[room.a]
            let part = global.db.data.users[m.sender]
            let gen = this.random(['Male', 'Female', 'Unknown'])
            //let gen = _gen[Math.floor(_gen.length * Math.random())]
                this.send2Button(room.a, 'Menemukan partner!', `Profile Partner:\nName: ${part.name}\nAge: ${part.age}\nGender: ${gen}\nHappy Talking🌹\nMade by ${wm}`, 'Next', '.next', 'Leave', '.leave', null)
                room.b = m.sender
                room.state = 'CHATTING'
                this.send2Button(m.chat, 'Menemukan partner!', `Profile Partner:\nName: ${name}\nAge: ${age}\nGender: ${gen}\nHappy Talking🌹\nMade by ${wm}`, 'Next', '.next', 'Leave', '.leave', null)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                //m.reply('Menunggu partner...')
                this.sendButton(m.chat, 'Menunggu partner...', 'Anonymous chat by '+wm, 'Leave', '.leave', m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']

handler.command = ['start', 'leave', 'next']
handler.private = true
handler.register = 1

module.exports = handler
