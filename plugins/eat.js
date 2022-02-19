let { MessageType } = require('@adiwajshing/baileys-md')
//BY RIZKY ADI∅
//DONT DELETE THIS CREDIT
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
	let type = (args[0] || '').toLowerCase()
    let msk= (args[0] || '').toLowerCase()
    if (global.db.data.users[m.sender].stamina > 50) return conn.reply(m.chat, 'Kamu Sudah kenyang!\nSilahkan Makan lagi nanti!', m)
let cok = `
Please choose what to eat🍟
🍖 ${usedPrefix}ayamb *[ ayam bakar ]*
🍗 ${usedPrefix}ayamg *[ ayam goreng ]*
🍣 ${usedPrefix}leleg *[ lele goreng ]*
🍣 ${usedPrefix}leleb *[ lele bakar ]*
🍖 ${usedPrefix}sapir *[ Rendang ]*
🍖 ${usedPrefix}ssapi *[ steak sapi ]*
Contoh Perintah ↓
${usedPrefix + command } sapir
`

try {
       if (/eat|makan/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
            	case 'ayamb':
            if (global.db.data.users[m.sender].ayamb >= count * 1) {
                            global.db.data.users[m.sender].ayamb -= count * 1
                            global.db.data.users[m.sender].stamina += 20
                            conn.reply(m.chat, `Nyam nyam\nKamu memakan ${count} ayam bakar 🍗\nMemulihkan 20 Stamina!`, m)
                       } else conn.reply(m.chat, `Kamu tidak memiliki ayam bakar :(\nMasak dulu`, m)
break

                  case 'sapir':
            if (global.db.data.users[m.sender].sapir >= count * 1) {
                            global.db.data.users[m.sender].sapir -= count * 1
                            global.db.data.users[m.sender].stamina += 20
                            conn.reply(m.chat, `Nyam nyam\nKamu memakan ${ count } Rendang 🥘\nMemulihkan 20 Stamina!`, m)
                       } else conn.reply(m.chat, `Kamu tidak memiliki rendang :(\nMasak Dulu`, m)
break
                   case 'ayamg':
            if (global.db.data.users[m.sender].ayamg >= count * 1) {
                           global.db.data.users[m.sender].ayamg -= count * 1
                           global.db.data.users[m.sender].stamina += 20
                            conn.reply(m.chat, `Nyam nyam\nKamu memakan ${ count } Ayam Goreng 🍗\nMemulihkan 20 Stamina!`, m)
                      } else conn.reply(m.chat, `Kamu tidak memiliki Ayam Goreng :(\nMasak Dulu`, m)
break
                        case 'leleg':
            if (global.db.data.users[m.sender].leleg >= count * 1) {
                          global.db.data.users[m.sender].leleg -= count * 1
                          global.db.data.users[m.sender].stamina += 20
                            conn.reply(m.chat, `Nyam nyam\nKamu memakan ${count} Lele Goreng 🍤\nMemulihkan 20 Stamina!`, m)
                       } else conn.reply(m.chat, `Kamu tidak memiliki Lele goreng :(\nMasak Dulu`, m)
break
                        case 'leleb':
            if (global.db.data.users[m.sender].leleb >= count * 1) {
                            global.db.data.users[m.sender].leleb -= count * 1
                            global.db.data.users[m.sender].stamina += 20
                            conn.reply(m.chat, `Nyam nyam\nKamu memakan ${ count } Lele Bakar 🍤\nMemulihkan 20 Stamina!`, m)
                       } else conn.reply(m.chat, `Kamu tidak memiliki Lele Bakar :(\nMasak Dulu`, m)
break
             case 'ssapi':
            if (global.db.data.users[m.sender].ssapi >= count * 1) {
                            global.db.data.users[m.sender].ssapi -= count * 1
                            global.db.data.users[m.sender].stamina += 20
                            conn.reply(m.chat, `Nyam nyam\nKamu memakan ${ count } Steak sapi 🥩\nMemulihkan 20 Stamina!`, m)
                       } else conn.reply(m.chat, `Kamu tidak memiliki Steak sapi :(\nMasak Dulu`, m)
break
                default:
                    return conn.sendButton(m.chat, cok, global.wm, `Makan`, `.eat`)
            }
        }
    } catch (e) {
        conn.reply(m.chat, `Sepertinya ada yg eror,coba laporin ke owner deh`, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['makan <masakan>']
handler.tags = ['rpg']

handler.command = /^(makan|eat)$/i
module.exports = handler