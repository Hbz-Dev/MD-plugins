let handler = async (m, { args, usedPrefix, command }) => {

if (!args[0]) throw 'usernamenya mana om\nContoh ryu'
if (!args[1]) throw 'repo nya mana?\nContoh Ryubotz-md'
try {
let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/main.zip`
//ByRizkyAdi
m.reply(`waiting for compress to zip`)
conn.sendFile(m.chat, url, 'repo.zip', '', m)
} catch {
let url2 = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/master.zip`
//For master branch
m.reply(`waiting for compress to zip`)
conn.sendFile(m.chat, url2, 'repo2.zip', '', m)
 }
}
handler.help = ['githubdl']
handler.tags = ['github']
handler.command = /githubdl/i

handler.limit = 1

module.exports = handler
