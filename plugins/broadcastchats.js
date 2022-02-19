let handler = async (m, { conn, text }) => {
  let chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us')).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  let ftroli = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: 34823,status: 200, thumbnail: require('fs').readFileSync('./media/bc.jpg'), surface: 200, message: `ALL CHATS BROADCAST`, orderTitle: 'Centauri', sellerJid: '0@s.whatsapp.net'}}}
  await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
  for (let id of chats) {
     await conn.sendButton(id, teks + '\n' + readMore + '「 All Chat Broadcast 」\n', global.wm, 'MENU', '.menu', ftroli)
    }
  m.reply('Selesai Broadcast All private Chat :)')
}
handler.help = ['broadcastchats', 'bcchats'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcastchats?|bcc(hats)?)$/i

handler.owner = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)