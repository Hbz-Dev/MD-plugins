let handler = async (m, { args, usedPrefix, command }) => {

if (!args[0]) throw 'usernamenya mana? Contoh:\n.githubdl test testt main'
if (!args[1]) throw 'repo nya mana? Contoh:\n.githubdl test testt main'
if (!args[2]) throw 'branch nya mana? Contoh:\n.githubdl test testt main'
try {
let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/${args[2]}.zip`
//ByRizkyAdi
await m.reply(`waiting for compress to zip`)
//conn.sendFile(m.chat, url, 'repo.zip', '', m)
conn.sendMessage(m.chat, { document: { url: url }, fileName: `${args[1]}/${args[2]}`, mimetype: 'application/zip' }, { quoted: m })
} catch (e) {
 m.reply('404 Tidak ditemukan\nAtau mungkin Di private')
 }
}
handler.help = ['githubdl']
handler.tags = ['github']
handler.command = /githubdl/i

handler.limit = 1

module.exports = handler
