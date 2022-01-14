function handler(m) {

let name = this.getName(m.sender)
let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
let listOwner = new Array()
  for (let i of owner.map(v => v.replace(/\D/g, '') + '@s.whatsapp.net')) {
  	listOwner.push({ vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:${this.getName(i)}\nitem1.X-ABLabel:Work\nURL;Web gwejh: http://github.com/HamzzBot\nEMAIL;📧 Email: ikiondeonde.com\nORG: 👑 creator\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:🌍 Region\nTEL;🚫 don't spam/call;waid= ${i.split('@')[0]}:${i.split('@')[0]}\nEND:VCARD` })
  }
  let send = this.sendMessage(m.chat, { displayName: listOwner.length + ' kontak', contacts: listOwner }, 'contactsArrayMessage', { quoted: fkon })
return m.reply('_*itu nomer owner,bukan bot!!*_')
}

handler.command = /^(nowner)$/i

module.exports = handler
