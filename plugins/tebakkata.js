let fetch = require('node-fetch')

let timeout = 60000
let poin = 1000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
    let anu = await res.json()
    let json = anu[Math.floor(Math.random() * anu.length)]
    let caption = `[ TEBAKKATA ]\n
${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
`.trim()
    conn.tebakkata[id] = [
        await conn.sendButton(m.chat, caption, `Tebakkata\nMade by ${wm}`, 'Bantuan', '.say Tidak ada bantuan yg tersedia!', m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban.toLowerCase()}*`, 'Play again? [limit]', 'Tebakkata', '.tebakkata', conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.game = true
handler.command = /^tebakkata/i

module.exports = handler
