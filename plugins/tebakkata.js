let fetch = require('node-fetch')

let timeout = 40000
let poin = 12000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `[ TEBAKKATA ]
${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tekat untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tebakkata[id] = [
        await conn.sendButton(m.chat, caption, `Tebak Kata\nMade By ${wm}`, 'Bantuan', '.tekat', m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebakkata[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban.toLowerCase()}*`, 'Play again? [LIMIT]', 'Tebak Kata', '.tebakkata', conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.game = true
handler.command = /^tebakkata/i

module.exports = handler
