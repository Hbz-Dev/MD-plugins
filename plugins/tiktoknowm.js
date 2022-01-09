const { tiktokDownloader } = require('../lib/downloader')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
                let anu = await tiktokDownloader(args[0])
                let teks = `
► VIDEO

⭔ *ID :* ${anu.id}
⭔ *Username :* ${anu.username}
⭔ *Nickname :* ${anu.nickname}
⭔ *Upload At :* ${anu.tanggal_buat}
⭔ *Resolusi :* ${anu.resolusi}
⭔ *Verify :* ${anu.verify}
⭔ *Like :* ${anu.statistic.diggCount}
⭔ *Share :* ${anu.statistic.shareCount}
⭔ *Comment :* ${anu.statistic.commentCount}
⭔ *Viewers :* ${anu.statistic.playCount}
⭔ *Private :* ${anu.video_private}
⭔ *Duet :* ${anu.duetEnabled}
⭔ *Stitch :* ${anu.stitchEnabled}
⭔ *Caption :* ${anu.desk}

♫ AUDIO

⭔ *ID :* ${anu.music.id}
⭔ *Title :* ${anu.music.title}
⭔ *Author :* ${anu.music.authorName}
⭔ *Original :* ${anu.music.original}
⭔ *Duration :* ${anu.music.duration}
⭔ *Album :* ${anu.music.album}
⭔ *Schedule Time :* ${anu.music.scheduleSearchTime}

Press The Button Below`
                let buttons = [
                    {buttonId: `sendbuffer ${anu.music.playUrl}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: anu.nowm },
                    caption: teks,
                    footer: 'Made By 𝐑𝐲𝐮𝐁𝐨𝐭𝐳複\nTiktok Downloader',
                    buttons: buttons,
                    headerType: 5
                }
                conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tik(tok)?(dl)?)$/i
handler.limit = true

module.exports = handler
