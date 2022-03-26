let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Link nya mana?\nContoh: ${usedPrefix + command} https://google.com`)
    let res = await shortUrl(text)
    if (!res) return m.reply('Status: 503\nWebsite Down :(')
    m.reply(`Link: ${res}\nStatus: 200`)
}
handler.help = ['shortlink <link>']
handler.tags = ['tools']
handler.command = /^(shortlink|shorturl)$/i
handler.limit = true

module.exports = handler

let fetch = require('node-fetch')
async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}