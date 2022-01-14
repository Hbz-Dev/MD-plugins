let fs = require('fs')

let handler = async (m, { text }) => {
    if (!text || !m.quoted.text) return m.reply('Tag pesan code pluginsnya dan pastikan lokasi file sudah benar!\nContoh: #sf /plugins/afk.js')
    await fs.writeFileSync(text, m.quoted.text)
    m.reply('Berhasil mengganti file '+ text)
}
handler.help = ['sf'].map(v => v + ' <tag code>')
handler.tags = ['owner']
handler.command = /^(saveplugin|sf)$/i

handler.owner = 1

module.exports = handler