let p = require('@bochilteam/scraper')

let handler = async (m, { text, conn }) => {
if (!text) return m.reply("Umm... apa yg mau dicari?")
p.pinterest(text).then((fu) => { 
let a = fu.toString().split(',')
let tu = a[Math.floor(Math.random() * a.length)]
conn.send2ButtonImg(m.chat, tu, 'Hasil pencarian: '+text, `Pinterest 🌟\nMade by ${wm}`, 'Get again', `.pinterest ${text}`, 'Random Image', '.pinterest random Image', m)
 })
}
handler.help = ['pinterest', 'image'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.limit = 1

handler.command = /^(pinterest|image)$/i

module.exports = handler