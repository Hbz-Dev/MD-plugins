/*
* THX TO
* Allah SWT
* Ortu
* RESTU
* RIZXYU
*/
let { MessageType } = require('@adiwajshing/baileys-md')

/*Count price*/
let sword = 9800
let pickaxe = 8927
let armor = 17290
let pancing = 9278

let Esword = 18290
let Epickaxe = 18230
let Earmor = 23847

let handler  = async (m, { conn, command, args, usedPrefix}) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0
  global.db.data.users[m.sender].sword = global.db.data.users[m.sender].sword || 0
  global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0
  let botol = global.wm

  let caption = `*💠 Crafting :*
⛏️pickaxe
🗡️Sword
🎣pancing

*🔮 Enchant*

⛏️  *Pickaxe = ${Epickaxe}*
Ketahanan ++
Nambang ++

*🗡️️Sword = ${Esword}*
Ketahanan +++
kelemahan -
Ketajaman ++
Burning fire +

[❗] Fitur Enchant Belum tersedia
`

  try {
    if (/craft|Crafting/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'pickaxe':
            if (global.db.data.users[m.sender].pickaxe == 1) return conn.sendButton(m.chat, `Kamu sudah memiliki *Pickaxe* Di Inventory mu!`, 'Cek dengan mengklik tombol dibawah\nNOTE: Fitur enchant masih tahap pembuatan tunggu update!', 'Cek Inventory', '.inv', m)
            if (user.kayu < 25 || user.string < 30) return m.reply(`Barang tidak cukup!\nUntuk membuat pickaxe. Kamu memerlukan : \n25 kayu🪵 \n0 iron⛓\n30 String🕸️`)
            global.db.data.users[m.sender].kayu -= 25
            global.db.data.users[m.sender].string -= 30
            global.db.data.users[m.sender].pickaxe = 1
            global.db.data.users[m.sender].pickaxedurability = 100
            m.reply("Sukses membuat 1 wooden pickaxe 🔨")
            break
          case 'sword':
            if (global.db.data.users[m.sender].sword == 1) return conn.sendButton(m.chat, `Kamu sudah memiliki *Sword* Di Inventory mu!`, 'Cek dengan mengklik tombol dibawah\nNOTE: Fitur enchant masih tahap pembuatan tunggu update!', 'Cek Inventory', '.inv', m)
            if(user.kayu < 35 || user.iron < 1 || user.string < 20) return m.reply(`Barang tidak cukup!\nUntuk membuat sword. Kamu memerlukan : 35 kayu🪵 1 iron⛓️ dan 20 String🕸️`)
            global.db.data.users[m.sender].kayu -= 35
            global.db.data.users[m.sender].iron -= 1
            global.db.data.users[m.sender].string -= 20
            global.db.data.users[m.sender].sword = 1
            global.db.data.users[m.sender].sworddurability = 100
            m.reply("Sukses membuat 1 wooden sword 🗡️")
            break
          case 'pancing':
            if (global.db.data.users[m.sender].fishingrod == 1) return conn.sendButton(m.chat, `Kamu sudah memiliki *Pancingan* Di Inventory mu!`, 'Cek dengan mengklik tombol dibawah\nNOTE: Fitur enchant masih tahap pembuatan tunggu update!', 'Cek Inventory', '.inv', m)
            if(user.kayu < 10 || user.string < 35) return m.reply(`Barang tidak cukup!\nUntuk membuat pancingan. Kamu memerlukan :\n10 kayu🪵\n0 iron⛓\n35 String🕸️`)
            global.db.data.users[m.sender].kayu -= 10
            global.db.data.users[m.sender].string -= 35
            global.db.data.users[m.sender].fishingrod = 1
            global.db.data.users[m.sender].fishingroddurability = 100
            m.reply("Sukses membuat 1 wooden Pancingan 🎣")
            break

          default:
            return conn.send3Button(m.chat, caption, `${botol}`, `Craft Pickaxe`, `.craft pickaxe`, `Craft Sword`, `.craft sword`, `Craft Fishingrod`, `.craft pancing`, m)
        }
    } else if (/enchant|enchan/i.test(command)) {
      return conn.sendButton(m.chat, 'Masih tahap pengerjaan!', 'Belum tersedia Sekarang\nMohon bersabar🙏', '📍 Back', '.menu', m)
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
      switch (_type) {
        case 't':
          break
        case '':
          break

        default:
          return conn.sendButton(m.chat, caption, `${wm}`, `⋮☰ Back`, `.menu`, m)
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}

handler.help = ['craft <tool>']
handler.tags = ['rpg']
handler.command = /^(craft|crafting|chant)/i

module.exports = handler