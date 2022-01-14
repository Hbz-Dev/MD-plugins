const { MessageType } = require('@adiwajshing/baileys-md')
const PhoneNumber = require('awesome-phonenumber')
async function handler(m) {
  let name = 'Lawak'
  number = owner[0].replace(/[^0-9]/g, '')
  let njid = number + '@s.whatsapp.net'


  let name2 = 'eaa'
  number2 = owner[1].replace(/[^0-9]/g, '')
  let njid2 = number2 + '@s.whatsapp.net'

  this.sendMessage(m.chat, {
    contacts: [{
      displayname: name, vcard: `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
EMAIL;type=INTERNET:wakabahiiro5@gmail.com'\n'
END:VCARD
`.trim()
    }]
  }, MessageType.ContactsArrayMessage, { quoted: m })
}
handler.help = ['developer']
handler.tags = ['info']

handler.command = /^(dev|pembuat)$/i

module.exports = handler