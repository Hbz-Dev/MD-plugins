let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/sfw/waifu')
  if (!res.ok) throw 'Error Website sedang down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  //conn.sendFile(m.chat, json.url, '', 'istri gweh', m, 0, { thumbnail: Buffer.alloc(0) })
  conn.but(m.chat, 'Nih 2D nya🥀', 'Wangyy\nMade By '+wm, m.sender, 'Get Again', '.waifu', `${json.url}`, m)
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i

handler.limit = true

module.exports = handler
