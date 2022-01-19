const { createHash } = require('crypto')
let handler = async (m) => {
    let sn = createHash('md5').update(m.sender).digest('hex')
    m.reply(`${sn}`)
}
handler.help = ['sn']
handler.tags = ['xp', 'main']
handler.command = /^(sn)$/i
handler.register = true
module.exports = handler
