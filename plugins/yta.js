let limit = 100
// const { servers, yta } = require('../lib/y2mate')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `Uhm... urlnya mana?\nContoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=UZHZbkCCt2M`
  await m.reply('_Wait a minute, Request in progress...._')
  // let server = (args[1] || servers[0]).toLowerCase()
  const isY = /y(es)/gi.test(args[1])
  const { id, thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  if (!id) return m.reply('[❗] Tidak bisa mendownload video live!')
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
  //let lunk = await shortUrl(link)
  link = link.split('https')[1]
  link = 'http' + link
  if (!isY) conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
${isLimit ? '_Ukuran File Terlalu Besar!!_\n' : ''}
*Title:* ${title}
*Filesize:* ${audio.fileSizeH}
*${isLimit ? 'Pakai ' : ''}Link:* ${link}
`.trim(), m)
  if (!isLimit) conn.sendFile(m.chat, link, title + '.mp3', null, m, false, { mimetype: 'audio/mpeg' })
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^(yta|ytmp3|mp3)$/i

module.exports = handler

/*async function shortUrl(url) {
  let fetch = require('node-fetch')
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}*/

