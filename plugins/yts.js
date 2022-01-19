let yts = require('yt-search')
let handler = async (m, { text }) => {
  if (!text) throw 'Apa yang mau dicari?\nContoh: !yts Orange 7'
  let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
*${v.title}*
_Duration: ${v.timestamp}_
_Uploaded ${v.ago}_
_${v.views} views_
_${v.url}_
      `.trim()
      case 'channel': return `
*${v.name}*
_${v.subCountLabel} (${v.subCount}) Subscriber_
_${v.videoCount} video_
_${v.url}_
`.trim()
    }
  }).filter(v => v).join('\n\n')
  m.reply(teks)
}
handler.help = ['ytsearch <pencarian>']
handler.tags = ['internet']
handler.limit = true
handler.exp = 0
handler.command = /^yts(earch)?$/i

module.exports = handler