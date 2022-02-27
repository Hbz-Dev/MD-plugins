let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} iphone`
    let res = await ringtone(text)
    let teks = res[Math.floor(Math.random() * res.length)]
    conn.sendFile(m.chat, teks.audio, `${teks.title}.mp3`, null, m, true)
}
handler.help = ['ringtone <pencarian>']
handler.tags = ['tools']
handler.limit = 1

handler.command = /^ringtone/i
handler.register = false
module.exports = handler

const axios = require('axios')
const cheerio = require('cheerio')
    function ringtone(title) {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/'+title)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
            })
            resolve(hasil)
        })
    })
}
