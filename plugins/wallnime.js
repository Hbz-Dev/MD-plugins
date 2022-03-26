const fetch = require('node-fetch')

let handler = async (m, { conn }) => {
  let a = ['https://hmtai.herokuapp.com/sfw/wallpaper', 'https://hmtai.herokuapp.com/mobilewallpaper/wallpaper']
  let res = await (await fetch(`${a[Math.floor(Math.random() * a.length)]}`)).json()
  if (!res.ok) throw eror
  conn.sendButtonImg(m.chat, res.url, '© Wallpaper Nime', res.url, 'Get Again', '.wallwibu', m)
  //conn.sendFile(m.chat, res.url, 'wallpaper.jpg', res.url, m, false, { ...Buffer.alloc(0) })
}
handler.help = ['wallnime']
handler.tags = ['anime']
handler.command = /^wall(wibu)?nime?$/i
handler.limit = true
module.exports = handler
