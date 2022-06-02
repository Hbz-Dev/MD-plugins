let { lookup } = require('mime-types')
let handler = async (m, { conn, text }) => {
  try {
    if (!text) return m.reply('Link nya mana?')
    let anu = await zippyDownloader(text)
    let mimetype = await lookup(anu.link)
    //conn.sendFile(m.chat, anu.link, `${anu.title}.${anu.extension}`, '', m)
    await m.reply(require('util').format(anu))
    if (anu.filesize.split('.')[0] > 600) return
    conn.sendMessage(m.chat, { document: { url: anu.link }, fileName: anu.title, mimetype }, { quoted: m })
  } catch {
   m.reply('Error mungkin Video dihapus/link kadaluarsa')
  }
}
handler.help = ['zippyshare']
handler.tags = ['downloader']
handler.command = /^(zippyshare|zippy|zs)$/i
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