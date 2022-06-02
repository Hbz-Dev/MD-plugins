/**
* jangan ganti ya kakak kakak sekalian
* ini cuma buat ninggalin credit gw doang :)
**/

const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let handler = async (m) => {
if (!m.isGroup) {
let esce = `
Bot ini Menggunakan Script Dari:
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
               displayText: 'Shiraori Bot',
               url: 'https://github.com/ilmanhdyt/ShiraoriBOT-Md'
             }

           },
               {
               urlButton: {
               displayText: 'Nana-Md',
               url: 'https://github.com/adualhy/Nana-Md'
              }
               
           },
               {
             quickReplyButton: {
               displayText: 'Ok Bang',
               id: 'cum',
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
  } else return conn.sendButton(m.chat, `Script Bot ${global.wm} Tidak di public kan!`, 'Maaf kak :)', 'Ok', 'iyaa', m)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i

module.exports = handler


