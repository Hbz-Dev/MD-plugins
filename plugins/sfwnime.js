let fetch = require('node-fetch')
let handler = async (m, { conn, command }) => {
  let res = await fetch(`https://api.waifu.pics/sfw/${command}`)
  if (!res.ok) throw 'Error Website sedang down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  //conn.but(m.chat, 'Nih Kak!', 'Anime sfw\nMade By '+wm, m.sender, 'Get Again', `.${command}`, `${json.url}`, m)
  conn.sendButtonImg(m.chat, `${json.url}`, `© Sfw ${command}`, global.wm, `${command}`, `.${command}`, m)
}
handler.help = ['neko', 'cry', 'hug', 'shinobu', 'bully', 'kiss', 'lick', 'pat', 'bonk', 'yeet', 'awoo', 'smile', 'blush', 'wave', 'nom', 'bite', 'glomp', 'slap', 'kill', 'happy', 'wink', 'poke', 'dance', 'cringe']
handler.tags = ['anime']
handler.command = /^(neko|cry|hug|shinobu|bully|kiss|lick|pat|bonk|yet|awoo|smile|blush|wave|nom|bite|glomp|slap|kill|happy|wink|poke|dance|cringe)$/i

handler.limit = true

module.exports = handler
