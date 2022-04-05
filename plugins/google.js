let { googleIt } = require('@bochilteam/scraper')

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Input Query'
    let search = await googleIt(text)
    let msg = search.articles.map((v) => `*${v.title}*\n_${v.url}_\n_${v.description}_`).join('\n\n')
    if (!msg.length) throw 'Not Found :/'
    m.reply(msg)
}
handler.help = ['google']
handler.tags = ['tools']
handler.command = /^google$/i

module.exports = handler

