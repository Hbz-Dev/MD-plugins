let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan query!`
  await m.reply('_Wait a minute, Request in progress...._')
  try {
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/anime', { q: text }))
  //if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, synopsis, episodes, url, rated, score, image_url } = json.results[0]
let animeingfo = `✨️ *Title:* ${title}
🥀️ *Episodes:* ${episodes}
🥀️ *Rating:* ${rated}
🥀️ *Score:* ${score}
🥀 *URL:* ${url}
🥀 *Synopsis:* ${synopsis}`
  conn.sendFile(m.chat, image_url, '', animeingfo, m)
  //let img = await (await fetch(image_url)).buffer()
  //conn.sendButtonLoc(m.chat, img, animeingfo, `Anime Info`, 'Click Here for Link Watch!', '.animelink')
  } catch (e) {
   m.reply('Tidak ditemukan... :(\nMungkin coba kata kunci lain?')
  }
}
handler.help = ['animeinfo <judul>', 'anime <search>']
handler.tags = ['anime']
handler.limit = true
handler.command = /^(animeinfo|anime)$/i
//maapin fatur :<
module.exports = handler
