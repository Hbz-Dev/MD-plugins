let handler = async (m, { conn, text }) => {
  try {
    let anu = await zippyDownloader(text)
    conn.sendFile(m.chat, anu.link, `${anu.title}.${anu.extension}`, '', m)
  } catch {
   m.reply('Link salah!')
  }
}
handler.help = ['zippyshare']
handler.tags = ['downloader']
handler.command = /^(zippyshare|zippy)$/i
handler.limit = true

module.exports = handler

let axios = require('axios')
let cheerio = require('cheerio')
function zippyDownloader(urls) {
    return new Promise((resolve, reject) => {
        axios.get(urls).then(({ data }) => {
            const $ = cheerio.load(data)
            const li = $.html()
            const po = $('#dlbutton').next().html()
            const le = po.split(';')[0]
            const lo = le.split("document.getElementById('dlbutton').href =")[1]
            const result = `${urls.split('/v')[0]}${eval(lo)}`
            const ho = $('#lrbox').text().replace(/\n/g, '')
			const ext = ho.split('Name:')[1].split('Size:')[0].split('.')[1]
            const hasil = {
                title: ho.split('Name:')[1].split('Size:')[0].trim(),
				extension: ext,
                filesize: ho.split('Size:')[1].split('Uploaded:')[0].trim(),
                upload: ho.split('Uploaded:')[1].split('          ')[0].trim(),
                link: result
            }
            resolve(hasil)
        })
    })
}