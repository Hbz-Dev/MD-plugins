let handler = async (m, { conn, command, args, usedPrefix }) => {
  if (!args[0]) throw `Pengunaan:\n${usedPrefix + command} <url>\n\nContoh:\n${usedPrefix + command} https://google.com/`
  try {
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = /f$/i.test(command) ? `https://hadi-api.herokuapp.com/api/ssweb2?url=${url}` : `https://api.popcat.xyz/screenshot?url=${url}`
  conn.sendMessage(m.chat, { image: { url: ss }, caption: url }, { quoted: m })
  } catch(e) {
  m.reply('Gagal mengambil tangkapan gambar....\nSilakan coba lagi setelah beberapa saat!')
  throw e
 }
}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i

module.exports = handler 