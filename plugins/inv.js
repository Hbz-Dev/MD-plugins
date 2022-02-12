let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
    let healt = global.db.data.users[m.sender].healt
    let sword = global.db.data.users[m.sender].sword
    let armor = global.db.data.users[m.sender].armor 
    let warn = global.db.data.users[m.sender].warning
    let pet = global.db.data.users[m.sender].pet
    let gold = global.db.data.users[m.sender].gold
    let emerald = global.db.data.users[m.sender].emerald
    let kayu = global.db.data.users[m.sender].kayu
    let batu = global.db.data.users[m.sender].batu
    let pasangan = global.db.data.users[m.sender].pasangan
    let namapasangan = global.db.data.users[`${pasangan}`].name || false
    let stamina = global.db.data.users[m.sender].stamina
    let jaring = global.db.data.users[m.sender].string
    let besi = global.db.data.users[m.sender].iron
    let kucing = global.db.data.users[m.sender].kucing
    let _kucing = global.db.data.users[m.sender].kucingexp
    let rubah = global.db.data.users[m.sender].rubah
    let _rubah = global.db.data.users[m.sender].rubahexp
    let kuda = global.db.data.users[m.sender].kuda
    let _kuda = global.db.data.users[m.sender].kudaexp
    let anjing = global.db.data.users[m.sender].anjing
    let _anjing = global.db.data.users[m.sender].anjingexp
    let diamond = global.db.data.users[m.sender].diamond
    let potion = global.db.data.users[m.sender].potion
    let banteng = global.db.data.users[m.sender].banteng
    let sapi = global.db.data.users[m.sender].sapi
    let ayam = global.db.data.users[m.sender].ayam
    let babi = global.db.data.users[m.sender].babi
    let kambing = global.db.data.users[m.sender].kambing
    let kerbau = global.db.data.users[m.sender].kerbau
    let harimau = global.db.data.users[m.sender].harimau
    let monyet = global.db.data.users[m.sender].monyet
    let babihutan = global.db.data.users[m.sender].babihutan
    let panda = global.db.data.users[m.sender].panda
    let gajah = global.db.data.users[m.sender].gajah
    let buaya = global.db.data.users[m.sender].buaya
    let ayamg = global.db.data.users[m.sender].ayamg
    let ayamb = global.db.data.users[m.sender].ayamb
    let sapir = global.db.data.users[m.sender].sapir
    let ssapi = global.db.data.users[m.sender].ssapi
    let leleg = global.db.data.users[m.sender].leleg
    let leleb = global.db.data.users[m.sender].leleb
    let common = global.db.data.users[m.sender].common
    let makananpet = global.db.data.users[m.sender].makananpet
    let uncommon = global.db.data.users[m.sender].uncommon
    let mythic = global.db.data.users[m.sender].mythic
    let legendary = global.db.data.users[m.sender].legendary
    let level = global.db.data.users[m.sender].level
    let fishrod = global.db.data.users[m.sender].fishingrod
    let fishrud = global.db.data.users[m.sender].fishingroddurability
    let axe = global.db.data.users[m.sender].pickaxe
    let axes = global.db.data.users[m.sender].pickaxedurability
    let money = global.db.data.users[m.sender].money
    let exp = global.db.data.users[m.sender].exp
    let limit = global.db.data.users[m.sender].limit
    let game = global.db.data.users[m.sender].game
    let sampah = global.db.data.users[m.sender].sampah
    let { max } = levelling.xpRange(level, exp, global.multiplier)
    let name = conn.contacts[m.sender]
    let { lastdaily, lastlabirin, lastexp, lastadventure, lastmining, lastdungeon, lastclaim, lastfishing, lastduel, lasthunt, lastweekly, lastmonthly } = global.db.data.users[m.sender]
    let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
    let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
    let usersmoney = sortedmoney.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncommon = sorteduncommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let str = `
*╭─────────[ Status ]─────────✧*
├◪ ♥️ Health: *${healt}*
├◪ 🍸 *Stamina:* ${stamina}
├◪ 💵 Money: *${money}*
├◪ 💌 *Pasangan:* ${pasangan ? namapasangan : '❌'}
├◪ 📈 Level: *${level}*
├◪ 💫 Exp: *${exp}*
├◪ 🎮 Limit Game: *${game}*
├◪ ✨ Limit: *${limit}*
*╰─────────────────────────·····*

*╭──────────[ Tools ]──────────✧*
├◪ 🎣 Fishingrod: *${fishrod == 0 ? 'Tidak Punya' : 'Wooden Fishingrod'}* [${fishrud == 0 ? 'Rusak' : `${fishrud} / 100`}]
├◪ ⛏ Pickaxe: *${axe == 0 ? 'Tidak Punya' : 'Wooden pickaxe'}* [${axes == 0 ? 'Rusak' : `${axes} / 100`}]
├◪ 🗡️ Sword: *${sword == 0 ? 'Tidak Punya' : '' || sword == 1 ? 'Stone Sword' : '' || sword == 2 ? 'Iron Sword' : '' || sword == 3 ? 'Gold Sword' : '' || sword == 4 ? 'Diamond Sword' : '' || sword == 5 ? 'Netherite Sword' : ''}*
├◪ 👕 Armor: *${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Netherite Armor' : ''}*
*╰─────────────────────────·····*

*╭─────────[ Inventory ]─────────✧*
├◪ 💎 Diamond: *${diamond}*
├◪ 👑 Gold: *${gold}*
├◪ 🧬 Emerald: *${emerald}*
├◪ 🪨 Batu: *${batu}*
├◪ 🌲 Kayu: *${kayu}*
├◪ 🔩 Besi: *${besi}*
├◪ 🧶 Benang: *${jaring}*
├◪ 🧪 Potion: *${potion}*
├◪ 🗑️ Sampah: *${sampah}*
├◪ 🥫 Makanan Pet: *${makananpet}*
├◪   Total inv: *${gold + emerald + kayu + batu + besi + jaring + diamond + potion + sampah + makananpet}* item
*╰────────────────────────·····*

*╭─────────[ Kandang ]─────────✧*
├◪ 🐔 *Ayam:* ${ayam}    
├◪ 🐐 *Kambing:* ${kambing}
├◪ 🐄 *Sapi:* ${sapi} 
├◪ 🐃 *Kerbau:* ${kerbau}
├◪ 🐖 *Babi:* ${babi}    
├◪ 🐅 *Harimau:* ${harimau}
├◪ 🐂 *Banteng:* ${banteng} 
├◪ 🐒 *Monyet:* ${monyet}
├◪ 🐗 *Babi Hutan:* ${babihutan}
├◪ 🐼 *Panda:* ${panda}
├◪ 🐘 *Gajah:* ${gajah}
├◪ 🐊 *Buaya:* ${buaya}
│
│ 🥢 Bisa kamu masak */masak ayamb*
├─────────────────────────◪
├◪ 💬 *Total Hewan:* ${ buaya + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + ayam + sapi + babi + banteng } tangkapan
*╰─────────────────────────·····*

*╭──────────[ Food ]──────────✧*
├◪ 🍖 *ayam bakar:* ${ayamb}
├◪ 🍗 *ayam goreng:* ${ayamg}
├◪ 🥘 *rendang sapi :* ${sapir}
├◪ 🥩 *steak sapi:* ${ssapi}
├◪ 🍤 *lele bakar:* ${leleb}
├◪ 🍤 *lele goreng:* ${leleg}
├─────────────────────────◪
├◪ 🎒 *Total Makanan:* ${ssapi + sapir + ayamg + ayamb + leleg + leleb}
*╰─────────────────────────·····*
*╭──────────[ Cooldown ]──────────✧*
├◪ ⏳ Claim: *${lastclaim > 0 ? '❌' : '✅'}*
├◪ ⏳ Daily: *${lastdaily > 0 ? '❌' : '✅'}*
├◪ ⏳ Labirin: *${lastlabirin > 0 ? '❌' : '✅'}*
├◪ ⏳ Exp: *${lastexp > 0 ? '❌' : '✅'}*
├◪ ⏳ Weekly: *${lastweekly > 0 ? '❌' : '✅'}*
├◪ ⏳ Monthly: *${lastmonthly > 0 ? '❌' : '✅'}*
├◪ ⏳ Adventure: *${lastadventure > 0 ? '❌' : '✅'}*
├◪ ⏳ Mining: *${lastmining > 0 ? '❌' : '✅'}*
├◪ ⏳ Fishing: *${lastfishing > 0 ? '❌' : '✅'}*
├◪ ⏳ Hunt: *${lasthunt > 0 ? '❌' : '✅'}*
├◪ ⏳ Dungeon: *${lastdungeon > 0 ? '❌' : '✅'}*
├◪ ⏳ Duel: *${lastduel > 0 ? '❌' : '✅'}*
*╰─────────────────────────·····*

*╭──────────[ Crate ]──────────✧*
├◪ 📦 Common: *${common}*
├◪ 🛍️ Uncommon: *${uncommon}*
├◪ 🎁 Mythic: *${mythic}*
├◪ 🧰 Legendary: *${legendary}*
├◪ 📫 Pet Crate: *${pet}*

*╭───────────[ Pet ]───────────✧*
├◪ 🐶 Anjing: *${anjing == 0 ? 'Tidak Punya' : '' || anjing == 1 ? 'Level 1' : '' || anjing == 2 ? 'Level 2' : '' || anjing == 3 ? 'Level 3' : '' || anjing == 4 ? 'Level 4' : '' || anjing == 5 ? 'Level MAX' : ''}*
├◪ 🐴 Kuda: *${kuda == 0 ? 'Tidak Punya' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}*
├◪ 🦊 Rubah: *${rubah == 0 ? 'Tidak Punya' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}*
├◪ 🐱 Kucing: *${kucing == 0 ? 'Tidak Punya' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}*\n
*╰─────────────────────────·····*

*──────────[ Progress ]──────────✧*
╭────────────────
│Level *${level}* To Level *${level + 1}*
│Exp *${exp}* -> *${max}*
╰────────────────
╭────────────────
│Anjing ${anjing == 0 ? 'Tidak Punya' : '' || anjing > 0 && anjing < 5 ? `Level *${anjing}* To level *${anjing + 1}*\n│Exp *${_anjing}* -> *${anjing *100}*` : '' || anjing == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Rubah ${rubah == 0 ? 'Tidak Punya' : '' || rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n│Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kucing ${kucing == 0 ? 'Tidak Punya' : '' || kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n│Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Max Level*' : ''}
╰────────────────
╭────────────────
│Kuda ${kuda == 0 ? 'Tidak Punya' : '' || kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n│Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Max Level*' : ''}
╰────────────────
*─────────────────────────·····*

*╭─────────[ Achievement ]─────────✧*
1.Top level *${userslevel.indexOf(m.sender) + 1}* dari *${userslevel.length}*
2.Top Money *${usersmoney.indexOf(m.sender) + 1}* dari *${usersmoney.length}*
3.Top Diamond *${usersdiamond.indexOf(m.sender) + 1}* dari *${usersdiamond.length}*
4.Top Potion *${userspotion.indexOf(m.sender) + 1}* dari *${userspotion.length}*
5.Top Common *${userscommon.indexOf(m.sender) + 1}* dari *${userscommon.length}*
6.Top Uncommon *${usersuncommon.indexOf(m.sender) + 1}* dari *${usersuncommon.length}*
7.Top Mythic *${usersmythic.indexOf(m.sender) + 1}* dari *${usersmythic.length}*
8.Top Legendary *${userslegendary.indexOf(m.sender) + 1}* dari *${userslegendary.length}*
9.Top Sampah *${userssampah.indexOf(m.sender) + 1}* dari *${userssampah.length}*
*╰─────────────────────────·····*
\n${readMore}
Warn: *${warn}*
`.trim()

    conn.reply(m.chat, str, m)
}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(inv(entory)?|bal)$/i
handler.group = true
handler.register = true
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
