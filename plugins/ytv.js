let limit = 100
const fetch = require('node-fetch')
// const { servers, ytv } = require('../lib/y2mate')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... urlnya mana?\nContoh:\n!ytv https://www.youtube.com/watch?v=UZHZbkCCt2M'
  await m.reply('_Wait a minute, Request in progress...._')
  let chat = global.db.data.chats[m.chat]
  let isY = /y(es)/gi.test(args[1])
  const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  let video, link = '', lastError
  for (let i in _video) {
    try {
      video = _video[i]
      link = await video.download()
      if (link) break
    } catch (e) {
      lastError = e
      continue
    }
  }
  if (!link) throw lastError
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < video.fileSize
  let lunk = await shortUrl(link)
  link = link.split('https')[1]
  link = 'http' + link
  if (!isY) conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
${isLimit ? '_Ukuran File Terlalu Besar!!_\n' : ''}
*Title:* ${title}
*Filesize:* ${video.fileSizeH}
*${isLimit ? 'Pakai ' : ''}Link:* ${lunk}
`.trim(), m)
  let _thumb = require('fs').readFileSync('./media/1.jpg')
  try { _thumb = await (await fetch(thumbnail)).buffer() }
  catch (e) { }
  if (!isLimit) conn.sendFile(m.chat, link, title + '.mp4', `
*Title:* ${title}
*Filesize:* ${video.fileSizeH}
`.trim(), m, false, {
    jpegThumbnail: _thumb
 })
}
handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = /^(ytv|ytmp4|mp4)$/i

module.exports = handler

async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}

