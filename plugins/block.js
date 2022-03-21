let handler = async (m, { conn }) => {

 let who
 if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
 else who = false
 if (!who) throw 'Tag Orang yang mau diblock!'
 let user = `${who.split("@s.whatsapp.net")[0]}` + '@c.us'
    await conn.updateBlockStatus(user, 'block')
  conn.reply(m.chat, `Done Block!`, m)
}
handler.help = ['block <@user>']
handler.tags = ['owner']
handler.command = /^block$/i
handler.owner = true

module.exports = handler
