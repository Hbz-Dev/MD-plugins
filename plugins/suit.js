let handler = async (m, { text, usedPrefix }) => {
    let salah = `Pilihan yang tersedia\n\ngunting, kertas, batu\n\n${usedPrefix}suit gunting\n\nkasih spasi!`
    if (!text) throw salah
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'batu'
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'gunting'
    } else {
        astro = 'kertas'
    }

    //menentukan rules
    if (text == astro) {
        global.db.data.users[m.sender].exp += 50
        m.reply(`[ SUIT GAME ]\n\nSeri! +50EXP\nkamu: ${text}\nBot: ${astro}`)
    } else if (text == 'batu') {
        if (astro == 'gunting') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`[ SUIT GAME ]\n\nKamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`[ SUIT GAME ]\n\nKamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'gunting') {
        if (astro == 'kertas') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`[ SUIT GAME ]\n\nKamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`[ SUIT GAME ]\n\nKamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'kertas') {
        if (astro == 'batu') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`[ SUIT GAME ]\n\nKamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`[ SUIT GAME ]\n\nKamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else {
        throw salah
    }
}
handler.help = ['suit <opts>']
handler.tags = ['game']
handler.level = 3
handler.game = true
handler.command = /^(suit)$/i

module.exports = handler
