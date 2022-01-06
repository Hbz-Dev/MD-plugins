const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fs = require('fs')
let moment = require('moment-timezone')
let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
let premium = `
*RYUBOTZ PRICE*

◩ *FREE USER*
└───────
 └❌ Unlimited Limit
 └❌ Premium User 
 └❌ Add bot to Group
 └❌ Full Access Features
  
◩ *PREMIUM USER*
└───────
 └✔ Unlimited Limit
 └✔ Premium User
 └❌ Add bot to Group
 └✔ Full Access Features
   └  ▹  *Rp. 3.000*
     └ Expired 7 hari
 └ Order | hub : owner
 
◩ *ADD BOT TO GROUP*
└───────
 └❌ Unlimited Limit
 └❌ Premium User 
 └✔ Add bot to Group
 └❌ Full Access Features
   └  ▹  *Rp. 8.000*
     └ Expired 7 hari
   └  ▹  *Rp. 20.000*
     └ Expired 30 hari 
    
  Order Premium + add group
  ▹  *Rp. 25.000*
 └  Expired 30 hari
 └ Order | hub : owner
`
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: premium,
           locationMessage: { 
           jpegThumbnail: fs.readFileSync('./media/esce.jpg') }, 
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: 'Nyoba atau emang mau beli?',
               url: 'Isekai'
             }

           },
               {
             quickReplyButton: {
               displayText: 'Owner',
               id: '.owner',
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
handler.help = ['price']
handler.tags = ['premium', 'main']
handler.command = /^(price)$/i

module.exports = handler
