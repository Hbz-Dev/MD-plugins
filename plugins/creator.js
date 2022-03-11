const PhoneNumber = require('awesome-phonenumber')
async function handler(m) {
                let vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                    + 'VERSION:3.0\n' 
                    + 'N:;Ownerbot;;;'
                    + 'FN:~ ʙᴏᴛᴢ ~\n' // full name
                    + 'ORG:Owner\nTEL;Chat yg Bener!;waid=6283844009539:6283844009539\n'
                    + 'item1.TEL;Support Whatsapp;waid=15517868060:15517868060\n' // WhatsApp ID + phone number
                    + 'item1.X-ABLabel:👑 Creator bot Whatsapp \n'
                    + 'item2.EMAIL;type=INTERNET:botwa12@gmail.com\n'
                    + 'item2.X-ABLabel:💌 𝙀𝙢𝙖𝙞𝙡\n'
                    + 'item3.URL:https://instagram.com/_12\n'
                    + 'item3.X-ABLabel:Instagram\n'
                    + 'item4.ADR:;;🇲🇨 Indonesia 🇲🇨;;;;\n'
                    + 'item4.X-ABADR:ac\n'
                    + 'item4.X-ABLabel:🌎 𝙍𝙚𝙜𝙞𝙤𝙣\n'
                    + 'item5.X-ABLabel:🌟 MULTI-DEVICE 🌟\n'
                    + 'END:VCARD'
                conn.sendMessage(m.chat, { contacts: { displayName: '~ Ｃｅｎｔａｕｒｉ ~', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
