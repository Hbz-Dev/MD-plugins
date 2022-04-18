let handler = async (m, { conn, text }) => {
  if (!text) throw 'Teksnya Mana?'
  let chats = Object.entries(conn.chats).filter(([_, chat]) => _).map(v => v[0])
  let ftroli = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: Math.floor(Math.random() * 10000), status: 200, thumbnail: require('fs').readFileSync('./media/bc.jpg'), surface: 200, message: `ALL BROADCAST`, orderTitle: 'Centauri', sellerJid: '0@s.whatsapp.net'}}}
  await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
  for (let id of chats) {
       await sleep(1500)
       await conn.sendButton(id, text + '\n' + readMore + '\n「 All Broadcast 」\n', global.wm, 'MENU', '.menu', ftroli)
    }
  m.reply('Selesai Broadcast All Chat :)')
}
handler.help = ['broadcastall', 'bcall'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(all|all)$/i

handler.owner = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }