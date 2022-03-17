let limit = 30
// const { servers, yta } = require('../lib/y2mate')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  let chat = global.db.data.chats[m.chat]
  // let server = (args[1] || servers[0]).toLowerCase()
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  let audio, link = '', lastError
  for (let i in _audio) {
    try {
      audio = _audio[i]
      link = await audio.download()
      if (link) break
    } catch (e) {
      lastError = e
      continue
    }
  }
  if (!link) throw lastError
  // let { dl_link, thumb, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < audio.fileSize
  link = link.split('https')[1]
  link = 'http' + link
  if (!isY) conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
📌*Title:* ${title}
🗎 *Filesize:* ${audio.fileSizeH}
*${isLimit ? 'Pakai ' : ''}Link:* ${link}
`.trim(), m)
  if (!isLimit) conn.sendFile(m.chat, link, title + '.mp3', null, m, false)
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yta|ytmp3|mp3)$/i

module.exports = handler

