let fs = require('fs')

let handler = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) throw `uhm.. teks nya mana?\n\ncontoh:\n${usedPrefix + command} runtime`
    if (!ar1.includes(text)) return m.reply(`'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
    m.reply(fs.readFileSync('./plugins/' + text + '.js', 'utf-8'))
}
handler.help = ['getplugin'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(getplugin|gp)$/i

handler.owner = 1

module.exports = handler