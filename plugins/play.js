//made by https://github.com/Paquito1923
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
const { servers, yta, ytv } = require('../lib/y2mate')
let fs = require('fs')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} Lemon Kenzhi Yonezu`
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Konten Tidak ditemukan'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
  if (yt === false) throw 'semua server gagal'
  if (yt2 === false) throw 'semua server gagal'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
let anu =  `
📚 *Title:* ${title}
🎵 *Size Audio:* ${filesizeF}
🎬 *Size Video:* ${yt2.filesizeF}
📹 *Duration:* ${vid.timestamp}
📌 *Upload:* ${vid.ago}
👨 *Author:* ${vid.author.name}

Choose *Audio* or *Video* in button below
Dont see it? Type:\n-*!yts yt_url <Audio>*\n-*!ytv yt_url <Video>*
`

     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: anu,
           locationMessage: { 
           jpegThumbnail: await (await fetch(thumb)).buffer() }, 
           hydratedFooterText: `DESKRIPSI:\n${vid.description}`,
           hydratedButtons: [{
             urlButton: {
               displayText: '🌟 Link YouTube',
               url: `${vid.url}`,
             }

           },
               {
             quickReplyButton: {
               displayText: '🎬 Video',
               id: `.ytmp4 ${vid.url}`,
             }

            },
               {
             quickReplyButton: {
               displayText: '🎵 Audio',
               id: `.ytmp3 ${dl_link}`,
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
handler.help = ['play'].map(v => v + ' <judul>')
handler.tags = ['downloader']
handler.limit = 1
handler.command = /^(play)$/i

handler.exp = 0

module.exports = handler
