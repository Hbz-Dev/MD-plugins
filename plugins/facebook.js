const { facebookdl, facebookdlv2, facebookdlv3 } = require('@bochilteam/scraper')
const { toVideo } = require('../lib/converter.js')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
    await m.reply('_Wait a minute, Request in progress...._')
    const res = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0])).catch(async _ => await facebookdlv3(args[0])).catch(_ => null)
    if (!res) return m.reply('Gagal...\nServer Down atau Link salah!')
    let end = res.result[0]?.isVideo ? res.result[0] : res.result[1]?.isVideo ? res.result[1] : res.result[2]?.isVideo ? res.result[2] : res.result[3]?.isVideo ? res.result[3] : res.result[4]?.isVideo ? res.result[4] : res.result[0]
    if (!end) throw `Gagal...\nSilakan ulangi lagi dalam beberapa menit`
    conn.getFile(end.url, true).then((v) => toVideo(v.data, '.mp4')).then((a) => conn.sendMessage(m.chat, { video: a.data, caption: `🗃 *Quality:* ${end.quality || '-'}\n🔑 *Fid & Vcodec:* ${res.id || end.fid || end.vcodec || '-'}`}, { quoted: m }))
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = 1

handler.command = /^((facebook|fb)(downloder|dl)?)$/i

module.exports = handler
