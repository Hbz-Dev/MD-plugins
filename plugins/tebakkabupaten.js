let fetch = require('node-fetch')
let timeout = 20000
let poin = 5000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkabupaten = conn.tebakkabupaten ? conn.tebakkabupaten : {}
    let id = m.chat
    if (id in conn.tebakkabupaten) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkabupaten[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json')
    if (!res.ok) throw eror
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tekab untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tebakkabupaten[id] = [
        //await conn.sendMessage(m.chat, { image: await (await fetch(json.url)).buffer(), caption: caption, mens: [m.sender] }, { quoted: m }),
        await conn.sendButtonImg(m.chat, json.url, caption, `Tebak Kabupaten\nMade By ${wm}`, 'Bantuan', '.tekab', m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebakkabupaten[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.title}*`, 'Play Again? [limit]', 'Tebak Kabupaten', '.tebakkabupaten', conn.tebakkabupaten[id][0])
            delete conn.tebakkabupaten[id]
        }, timeout)
    ]
}
handler.help = ['tebakkabupaten']
handler.tags = ['game']
handler.game = true
handler.command = /^tebakkabupaten/i

module.exports = handler
