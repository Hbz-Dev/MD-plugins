let fetch = require('node-fetch')

let handler = async (m, { conn, command, args, usedPrefix }) => {
  if (!args[0]) throw `Pengunaan:\n${usedPrefix + command} <url>\n\nContoh:\n${usedPrefix + command} https://google.com/`
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = /f$/i.test(command) ? API('http://hadi-api.herokuapp.com', '/api/ssweb2', { url }) : API('https://api.popcat.xyz', '/screenshot', { url })
  conn.sendMessage(m.chat, { image: { url: ss }, caption: url, jpegThumbnail: await (await fetch(ss)).buffer() }, { quoted: m })
}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i

module.exports = handler 