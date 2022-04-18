/**
 * TOLONG JANGAN GANTI GAMBARNYA,NOMORKU DAN SAWERIAKU
 * MENDING KALIAN TAMBAHIN NOMOR KALIAN
 * BAIKLAH!!
*/

const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let handler = async (m) => {
let duit = `*────── 「 DONATE 」 ──────*

Hai 👋
Kalian bisa mendukung saya agar bot ini tetap up to date
Berapapun donasi kalian akan sangat berarti 👍

Arigatou!

Contact Owner For Detail:
wa.me/994407430641 (Owner)`
let message = await prepareWAMessageMedia({ image: {url: 'https://telegra.ph/file/ca517a39ce85c8a4c0479.jpg' }}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: duit,
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: '𝑺𝒂𝒘𝒆𝒓𝒊𝒂',
               url: 'Saweria'
             }

           },
               {
             urlButton: {
               displayText: '𝑻𝒓𝒂𝒌𝒕𝒆𝒆𝒓',
               url: 'Trakteer'
             }
           },           
               {
             quickReplyButton: {
               displayText: '𝑶𝒘𝒏𝒆𝒓',
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

handler.help = ['donasi']
handler.tags = ['info']
handler.disabled = true
handler.command = /^dona(te|si)$/i

module.exports = handler
