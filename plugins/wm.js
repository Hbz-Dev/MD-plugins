let fs = require('fs')
let { sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, text }) => {
let text1 = text.split('|')[0]
let text2 = text.split('|')[1]
let stiker = false
try {
   let q = m.quoted ? m.quoted : m
   let mime = m.quoted.mimetype || ''
      if (/webp/.test(mime)) {
      let img = await q.download()
      stiker = await sticker5(img, false, text1 ? text1 : '', text2 ? text2 : '')
    } else if (/image/.test(mime)) {
      let img = await q.download()
      stiker = await sticker5(img, false, text1 ? text1 : '', text2 ? text2 : '')
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw 'Maksimal 10 detik!'
      let img = await q.download()
      stiker = await sticker5(img, false, text1 ? text1 : '', text2 ? text2 : '')
    } else {
     m.reply('Tag/kirim image/video/sticker yang ingin diberikan wm custom!!')
     }
   } finally {
     if (stiker) conn.sendFile(m.chat, stiker, 'stiker.webp', '', m)
     else throw 'Maaf ada yg error'
  }
}
handler.help = ['wm', 'take', 'swm'].map(v => v + ' <packname|author>')
handler.tags = ['sticker']
handler.command = /^(wm|take|swm|stickwm)$/i

handler.limit = true

module.exports = handler