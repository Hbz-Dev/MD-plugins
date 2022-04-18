let PhoneNumber = require('awesome-phonenumber')

let handler = async(m, { conn, text, args }) => {

   let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
   if (!(args[1] || text)) return conn.reply(m.chat, 'Mau Disave Namanya Apa?', m)
   let nomor = `${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`

  conn.sendContact(m.chat, nomor, m.quoted ? text : args.slice(1).join(' '), m)
}
handler.help = ['save [tag] <nama>']
handler.tags = ['group']
handler.command = /^(save)$/i

module.exports = handler
