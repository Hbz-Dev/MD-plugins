const { facebookdl, facebookdlv2, facebookdlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
    await m.reply('_Wait a minute, Request in progress...._')
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0])).catch(async _ => await facebookdlv3(args[0]))
    let { url, isVideo } = result[0]
    conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `🔗 *Url:* ${url}`, m)
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = 1

handler.command = /^((facebook|fb)(downloder|dl)?)$/i

module.exports = handler
