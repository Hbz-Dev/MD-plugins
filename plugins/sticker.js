const { sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) {
            let img = await q.download()
            if (!img) throw `reply sticker with command s`
            stiker = await sticker5(img, false, packname, author)
        } else if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) throw `reply image with command s`
            stiker = await sticker5(img, false, packname, author)
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('max is 10 seconds!')
            let img = await q.download()
            if (!img) throw `reply video with command s`
            stiker = await sticker5(img, false, packname, author)
        } else if (args[0]) {
            if (isUrl(args[0])) stiker = await sticker5(false, args[0], packname, author)
            else throw 'URL is not valid! end with jpg/gif/png'
        } else {
        m.reply(`Balas gambar/video/sticker dengan caption ${usedPrefix + command}`)
      }
    } catch (e) {
        throw e
    }
    finally {
        if (stiker) await conn.sendFile(m.chat, stiker, 'stiker.webp', '', m)
    }
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i

module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}