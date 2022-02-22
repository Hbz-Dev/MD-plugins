let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  let res = await (await fetch('https://katanime.vercel.app/api/getrandom?limit=1'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result[0]) throw json
  let { indo, character, anime } = json.result[0]
  conn.sendButton(m.chat, `${indo}\n\nBy: ~ _${character}_ ~`, `Anime:\n${anime}`, 'Kata² Anime', '.quotesnime', m)
}
handler.help = ['quotesnime']
handler.tags = ['anime', 'quotes']
handler.command = /^(quotesnime|kataanime)$/i
module.exports = handler