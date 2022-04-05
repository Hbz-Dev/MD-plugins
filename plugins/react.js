let { proto } = require("@adiwajshing/baileys-md")

let handler = async (m, { conn, text }) => {
if (!m.quoted) return m.reply('Reply Pesannya!!')
if (!text) return m.reply('Masukkan emotnya!!\nContoh:\n.react 🗿')
let huhu = {
remoteJid: `${m.quoted.chat}`,
fromMe: m.quoted.fromMe ? true : false,
id: `${m.quoted.id}`,
participant: `${m.quoted.sender}`
}
let msg = await proto.ReactionMessage.create({
 key: huhu,
 text: text,
 senderTimeStampMs: {
   low: 193992,
   high: 0,
   unsigned: false
}
})

conn.relayMessage(m.chat, { reactionMessage: msg }, { messageId: `${huhu.id}` })
}
handler.tags = ['owner']
handler.help = ['React [emot] <reply>']
handler.owner = 1
handler.command = /^(react|rect)$/i
module.exports = handler