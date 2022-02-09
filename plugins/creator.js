const PhoneNumber = require('awesome-phonenumber')
async function handler(m) {
                let vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                    + 'VERSION:3.0\n' 
                    + 'N:;Ownerbot;;;'
                    + 'FN:~ ꜱʜɪɴᴏᴀ ʙᴏᴛᴢ ツ ~\n' // full name
                    + 'ORG:「 𝐑𝐲𝐮 」複ツ\nTEL;Owner Of Whatsapp🌟;waid=0:0\n'
                    + 'item1.TEL;Chat yg Bener!;waid=994407430641:994407430641\n' // WhatsApp ID + phone number
                    + 'item1.X-ABLabel:👑 Creator bot 𒆜ꜱʜɪɴᴏᴀ ʙᴏᴛᴢ𒆜 \n'
                    + 'item2.EMAIL;type=INTERNET:random25@gmail.com\n'
                    + 'item2.X-ABLabel:💌 𝙀𝙢𝙖𝙞𝙡\n'
                    + 'item3.URL:https://instagram.com/_Ryu12\n'
                    + 'item3.X-ABLabel:Instagram\n'
                    + 'item4.ADR:;;🇲🇨 Indonesia 🇲🇨;;;;\n'
                    + 'item4.X-ABADR:ac\n'
                    + 'item4.X-ABLabel:🌎 𝙍𝙚𝙜𝙞𝙤𝙣\n'
                    + 'item5.X-ABLabel:🌟 MULTI-DEVICE 🌟\n'
                    + 'END:VCARD'
                conn.sendMessage(m.chat, { contacts: { displayName: '~ 𝑅𝓎𝓊𝐵𝑜𝓉𝓏 複ツ ~', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
