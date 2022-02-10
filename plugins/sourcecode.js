/**
* jangan ganti ya kakak kakak sekalian
* ini cuma buat ninggalin credit gw doang :)
**/

const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fs = require('fs')
let handler = async (m) => {
if (!m.isGroup) {
let esce = `
Bot ini Menggunakan Script Dari

1.) https://github.com/ilmanhdyt/ShiraoriBOT-Md
2.) https://github.com/adualhy/Nana-Md
`
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: esce,
           locationMessage: { 
           jpegThumbnail: fs.readFileSync('./media/esce.jpg') },           
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: 'Link 1',
               url: 'https://github.com/ilmanhdyt/ShiraoriBOT-Md'
             }

           },
               {
               urlButton: {
               displayText: 'Link 2',
               url: 'https://github.com/adualhy/Nana-Md'
              }
               
           },
               {
             quickReplyButton: {
               displayText: 'Ok Bang',
               id: '.say Ok Kalo mau download Silakan!',
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
  } else return conn.sendButton(m.chat, 'Script Bot ShinoaBot Tidak di public kan!', global.wm, 'Ok', 'iyaa', m)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i

module.exports = handler


