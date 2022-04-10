const { instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } = require('@bochilteam/scraper')
let fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_medium=copy_link`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CQU21b0JKwq/`
  await m.reply('_Wait a minute, Request in progress...._')
    instagramdl(args[0]).then(async res => {
    let instagramdl = JSON.stringify(res)
    let json = JSON.parse(instagramdl)
    for (let { url, thumbnail } of json) {
      await delay(1500)
      conn.sendFile(m.chat, url, 'ig.bin', 'Instagram Downloader\n'+wm, m, { jpegThumbnail: await(await fetch(thumbnail)).buffer() })
    }
  }).catch(async _ => {
    instagramdlv2(args[0]).then(async res => {
    let instagramdl = JSON.stringify(res)
    let json = JSON.parse(instagramdl)
    for (let { url, thumbnail } of json) {
      await delay(1500)
      conn.sendFile(m.chat, url, 'ig.bin', 'Instagram Downloader\n'+wm, m, { jpegThumbnail: await(await fetch(thumbnail)).buffer() })
    }
  })
 }).catch(async _ => {
   instagramdlv3(args[0]).then(async res => {
    let instagramdl = JSON.stringify(res)
    let json = JSON.parse(instagramdl)
    for (let { url, thumbnail } of json) {
      await delay(1500)
      conn.sendFile(m.chat, url, 'ig.bin', 'Instagram Downloader\n'+wm, m, { jpegThumbnail: await(await fetch(thumbnail)).buffer() })
     }
    })
   }).catch(async _ => {
   instagramdlv4(args[0]).then(async res => {
    let instagramdl = JSON.stringify(res)
    let json = JSON.parse(instagramdl)
    for (let { url, thumbnail } of json) {
      await delay(1500)
      conn.sendFile(m.chat, url, 'ig.bin', 'Instagram Downloader\n'+wm, m, { jpegThumbnail: await(await fetch(thumbnail)).buffer() })
     }
   })
 })
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|igdl|instagram)$/i
handler.limit = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))