let buatall = 1
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    conn.judi = conn.judi ? conn.judi : {}
    conn.judi[m.chat] = conn.judi[m.chat] ? conn.judi[m.chat] : {}
    conn.judi[m.chat].x = conn.judi[m.chat].x ? conn.judi[m.chat].x : false
    conn.judi[m.chat].y = conn.judi[m.chat].y ? conn.judi[m.chat].y : false
    try {
        if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'judi2 [x/y] <jumlah>\n ' + usedPrefix + 'judi2 x 1000', m)
        let count = 10000
        count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / buatall) : parseInt(count) : args[1] ? parseInt(args[1]) : 1
        count = Math.max(1, count)
        if (global.db.data.users[m.sender].money >= count * 1) {
        let type = args[0].toLowerCase()
        if (type !== 'x' && type !== 'y') return m.reply('Hanya X/Y pilihannya!')
        if (conn.judi[m.chat].x == m.sender || conn.judi[m.chat].y == m.sender) return m.reply(`Kamu telah memilih!\nSilahkan Tunggu player lain`)
        if ((type == 'x' && conn.judi[m.chat].x) || (type == 'y' && conn.judi[m.chat].y)) return m.reply(`${type} Telah dipilih oleh @${type == 'x' ? conn.judi[m.chat].x.split('@')[0] : conn.judi[m.chat].y.split('@')[0]}!`)
        if (type == 'x') conn.judi[m.chat].x = m.sender
        if (type == 'y') conn.judi[m.chat].y = m.sender
        
        if (conn.judi[m.chat].x && !conn.judi[m.chat].y) return m.reply('Kamu telah memilih *X*!\nX = Bagian Angka\nMenunggu *Y*....')
        if (conn.judi[m.chat].y && !conn.judi[m.chat].x) return m.reply('Kamu telah memilih *Y*!\nY = Bagian Garuda\nMenunggu *X*....')
        //let randomaku = `${Math.floor(Math.random() * 90)}`.trim()
        await m.reply(`*${type}* Ditemukan!\n\nX = @${conn.judi[m.chat].x.split('@')[0]}\nY = @${conn.judi[m.chat].y.split('@')[0]}\n\nMemulai Flip coin...`)
        let random = Math.floor(Math.random() * 2) //hehe Biar Susah Menang :v
        //let Aku = (randomaku * 1)
        let hehe = random == 0 ? 'xc' : 'yc'
        //let hsl = await conn.sendFile(m.chat, await require('../lib/sticker.js').sticker5(require('fs').readFileSync(`./media/${hehe}.png`), false, `${hehe}oin`, wm), `${hehe}.webp`)
        let hsl = await conn.sendImageAsSticker(m.chat, `./media/${hehe}.png`, null)
            //global.db.data.users[m.sender].money -= count * 1
            //await m.reply('*Jangan judi gk bakal menang!!, kalau gk percaya gpp*') Kwkwwkkwlwlw
            if (random == 0) {
                global.db.data.users[conn.judi[m.chat].x].money += count * 1
                global.db.data.users[conn.judi[m.chat].y].money -= count * 1
                conn.reply(m.chat, `Berdasarkan hasil flip yaitu *Bagian Angka*....\nmaka *X* adalah pemenang!\n@${conn.judi[m.chat].x.split('@')[0]} Menang Taruhan!\n+${count} Money\n\n@${conn.judi[m.chat].y.split('@')[0]} Kalah Taruhan!\n-${count} Money`.trim(), hsl)
                delete conn.judi[m.chat]
            } else {
                global.db.data.users[conn.judi[m.chat].y].money += count * 1
                global.db.data.users[conn.judi[m.chat].x].money -= count * 1
                conn.reply(m.chat, `Berdasarkan hasil flip yaitu *Bagian Garuda*....\nmaka *Y* adalah pemenang!\n@${conn.judi[m.chat].y.split('@')[0]} Menang Taruhan!\n+${count} Money\n\n@${conn.judi[m.chat].x.split('@')[0]} Kalah Taruhan!\n-${count} Money`.trim(), hsl)
                delete conn.judi[m.chat]
            }
        } else conn.reply(m.chat, `uang kamu tidak cukup untuk melakukan judi sebesar ${count} Money`.trim(), h)
    } catch (e) {
        throw e
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Judi.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
      }
    }
}
    
handler.help = ['judi2 [x/y] <jumlah>']
handler.tags = ['rpg']
handler.command = /^(judi2)$/i

handler.fail = null

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
