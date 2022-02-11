const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let _pp = await conn.profilePictureUrl(who).catch(_ => false)
    let pp = _pp ? await (await fetch(_pp)).buffer() : fs.readFileSync('./media/1.jpg')
let anu = `
╭◈ *「 PROFILE 」*
├─ 📇 *Name* : ${user.name}
├─ 🆔 *Nomor* : ${m.sender.split('@')[0]}
├─ 🎨 *Age* : ${user.age + ''}
├─ 📍 *Role* : ${user.role}
├─ 🎫 *Limit* : ${user.limit}
├─ 🎟 ️ *Limit Game* : ${user.game}
├─ 💹 *Money* : ${user.money}
├─ 📊 *Level* : ${user.level}
╰─ ✨ *Exp* : ${user.exp}
`
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: anu,
           locationMessage: { 
           jpegThumbnail: pp }, 
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: `🌟 ${await conn.getName(m.sender)} 🌟`,
               url: 'Isekai'
             }

           },
               {
             quickReplyButton: {
               displayText: '🔙 Back To Menu',
               id: '.menu',
             }

           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
}
handler.help = ['my', 'me', 'profile']
handler.tags = ['xp']
handler.register = true
handler.command = /^(my|me|profile)$/i

module.exports = handler