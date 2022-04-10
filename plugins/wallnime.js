const fetch = require('node-fetch')

let handler = async (m, { conn }) => {
  try {
  let a = ['https://hmtai.herokuapp.com/sfw/wallpaper', 'https://hmtai.herokuapp.com/sfw/mobilewallpaper']
  let res = await (await fetch(`${a[Math.floor(Math.random() * a.length)]}`)).json()
  conn.sendButtonImg(m.chat, res.url, '© Wallpaper Nime', res.url, 'Get Again', '.wallnime', m)
  } catch {
  let rus = await (await fetch('https://nekos.life/api/v2/img/wallpaper')).json()
  conn.sendButtonImg(m.chat, rus.url, '© Wallpaper Nime', res.url, 'Get Again', '.wallnime', m)
  }
  //conn.sendFile(m.chat, res.url, 'wallpaper.jpg', res.url, m, false, { ...Buffer.alloc(0) })
}
handler.help = ['wallnime']
handler.tags = ['anime']
handler.command = /^wall(wibu)?nime?$/i
handler.limit = true
module.exports = handler
