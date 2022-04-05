/**
diremake oleh https://github.com/unknowkzr

**/

let fetch = require('node-fetch')


let handler  = async (m, { conn }) => {
            await fetch(`https://raw.githubusercontent.com/HasamiAini/Bot_Takagisan/main/faktanya.txt`)
            .then(res => res.text())
            .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                conn.sendButton(m.chat, randomnix, 'Fakta Unik!', 'Fakta lainnya', '.fakta', m)
  })
} 
handler.help = ['fakta']
handler.tags = ['quotes']
handler.command = /^(fakta|faktaunik)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
