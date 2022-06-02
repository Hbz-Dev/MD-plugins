const { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
const { servers, yta } = require('../lib/y2mate')
let fetch = require('node-fetch')
let handler = async (m, { conn, isOwner, isPrems, command, text, usedPrefix }) => {
    if(!text) throw `Contoh: ${usedPrefix}${command} i see your monster`
    m.reply('_Wait a minute, Request in progress...._')
    let anu = await youtubeSearch(text)
    let vid = anu.video
    let vide 
    if (/playrand(om)?$/i.test(command)) vide = pickRandom(vid)
    else vide = vid[0]
    if(!vide) return conn.sendButton(m.chat, 'Video/Audio Tidak ditemukan', wm, 'Coba Lagi', `.playramdom ${text}`, m) 
    let { authorName, authorAvatar, title, description, url, thumbnail, videoId, durationH, viewH, publishedTime } = await vide
    let capt = `🎬 *YouTube Play*
  
📌 *Title:* ${title}
📮 *ID:* ${videoId}
⌚ *Duration:* ${durationH}
👁️ *Viewers:* ${viewH}
⏲️ *Uploaded:* ${publishedTime}
👑 *Author Name:* ${authorName}
🚀 *Source:* ${url}
📝 *Description:* ${description}`
    await conn.sendBD(m.chat, capt, `Jika Ingin Dalam bentuk audio reply dokumen dengan perintah #tomp3\n\n${global.wm}`, 'https://telegra.ph/file/27e90a619b30082694bde.jpg', [['📽 Video 📽', `${usedPrefix}ytv ${url} yes vid`], [`🔎 Play Acak 🔍`, `${usedPrefix}playrand ${text}`]], m, {
     fileName: `Enjoy ${m.name} 🤩`, mimetype: td, fileLength: 9999999999, pageCount: 10000,
     mentions: [m.sender],
     contextInfo: {
     externalAdReply :{
     mediaUrl: `${url}`,
     mediaType: 2,
     description: '', 
     title: 'Play Youtube Music ツ', 
     body: 'Klik Disini Untuk Membuka link',
     thumbnail: await(await fetch(thumbnail)).buffer()
     }} 
    })
  let user = db.data.users[m.sender]
  if (user.limit < 1 ) return  
  let limit
  if((isOwner || isPrems)) limit = 200
  else limit = 90
  try {
  let audi = await youtubedl(url)
  let { thumbnail, audio, title } = audi
  let det = audi.audio['128kbps']
  let { quality, fileSizeH, fileSize } = det
  let audiox = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: audiox }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  } catch {
  try {
  let audi = await youtubedlv2(url)
  let { thumbnail, audio, title } = audi
  let det = audi.audio['128kbps']
  let { quality, fileSizeH, fileSize } = det
  let audiox = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: audiox }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  } catch {
  try {
  let audi = await youtubedlv3(url)
  let { thumbnail, audio, title } = audi
  let det = audi.audio['128kbps']
  let { quality, fileSizeH, fileSize } = det
  let audiox = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: audiox }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  }  catch {
  try {
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb: thumbnail, title, filesize, filesizeF } = await yta(url, servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < filesize
  if (!isLimit) await conn.sendMessage(m.chat, { document: { url: dl_link }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
  } catch {
    throw false 
        }
      }
    }
  }
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play(rand(om)?)?$/i

module.exports = handler

let _mim = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'text/rtf']
let td = _mim[Math.floor(Math.random() * _mim.length)]

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

