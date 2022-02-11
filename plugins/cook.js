let { MessageType } = require('@adiwajshing/baileys-md')
//BY RIZKY ADI∅
//DONT DELETE THIS CREDIT
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
	let type = (args[0] || '').toLowerCase()
    let msk= (args[0] || '').toLowerCase()
let cok = `
Please choose what to cook🍳
🍖 ⟩ ${usedPrefix}ayamb *[ ayam bakar ]*
🍗 ⟩ ${usedPrefix}ayamg *[ ayam goreng ]*
🍣${usedPrefix}leleg *[ lele goreng ]*
🍣${usedPrefix}leleb *[ lele bakar ]*
🍖${usedPrefix}sapir *[ rendang ]*
🍖${usedPrefix}ssapi *[ steak sapi ]*
Contoh Perintah ↓
${usedPrefix + command } sapir
Untuk makan ${usedPrefix}eat sapir
`

try {
       if (/masak|cook/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
            	case 'ayamb':
            if (global.db.data.users[m.sender].ayam >= count * 1) {
                           global.db.data.users[m.sender].ayam >= count * 1
                            global.db.data.users[m.sender].ayam -= count * 1
                            global.db.data.users[m.sender].ayamb += count * 1
                            conn.reply(m.chat, `Succes memasak ${count } ayam bakar🍖`, m)
                       } else conn.reply(m.chat, `Stok buruan mu tidak cukup untuk dimasak`, m)
break

                  case 'sapir':
            if (global.db.data.users[m.sender].ayam >= count * 1) {
                            global.db.data.users[m.sender].sapi >= count * 1
                            global.db.data.users[m.sender].sapi -= count * 1
                            global.db.data.users[m.sender].sapir += count * 1
                            conn.reply(m.chat, `Succes memasak ${ count } Rendang 🍜`, m)
                       } else conn.reply(m.chat, `hewan yg kamu dapatkan tidak cukup untuk dimasak`, m)
break
                   case 'ayamg':
            if (global.db.data.users[m.sender].ayam >= count * 1) {
                           global.db.data.users[m.sender].ayam >= count * 1
                            global.db.data.users[m.sender].ayam -= count * 1
                            global.db.data.users[m.sender].ayamg += count * 1
                            conn.reply(m.chat, `Succes memasak ${ count } ayam goreng🍗`, m)
                       } else conn.reply(m.chat, `Stok buruan mu tidak cukup untuk dimasak`, m)
break
                        case 'leleg':
            if (global.db.data.users[m.sender].lele >= count * 1) {
                          global.db.data.users[m.sender].lele >= count * 1
                            global.db.data.users[m.sender].lele -= count * 1
                            global.db.data.users[m.sender].leleg += count * 1
                            conn.reply(m.chat, `Succes memasak ${ count } lele goreng🍤`, m)
                       } else conn.reply(m.chat, `Stok buruan mu tidak cukup untuk dimasak`, m)
break
                        case 'leleb':
            if (global.db.data.users[m.sender].lele >= count * 1) {
                            global.db.data.users[m.sender].lele >= count * 1///DONT DELETE THIS
                            global.db.data.users[m.sender].lele -= count * 1
                            global.db.data.users[m.sender].leleb += count * 1
                            conn.reply(m.chat, `Succes memasak ${ count } lele bakar🐟`, m)
                       } else conn.reply(m.chat, `Stok buruan mu tidak cukup untuk dimasak`, m)
break
             case 'ssapi':
            if (global.db.data.users[m.sender].sapi >= count * 1) {
                            global.db.data.users[m.sender].sapi >= count * 1///DONT DELETE THIS
                            global.db.data.users[m.sender].sapi -= count * 1
                            global.db.data.users[m.sender].ssapi += count * 1
                            conn.reply(m.chat, `Succes memasak ${ count } steak sapi`, m)
                       } else conn.reply(m.chat, `Stok buruan mu tidak cukup untuk dimasak`, m)
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

handler.help = ['masak <masakan> <args>', 'cook <Cook> <args>']
handler.tags = ['rpg']

handler.command = /^(masak|cook)$/i
module.exports = handler