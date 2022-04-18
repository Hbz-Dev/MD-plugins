let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => fla + `Profile ${conn.getName(who)}`)
let anu = `
╭◈ *「 PROFILE 」*
├─ 📇 *Name* : ${user.name}
├─ 🆔 *Nomor* : ${m.sender.split('@')[0]}
├─ 🎨 *Age* : ${user.age + ''}
├─ 📍 *Role* : ${user.role}
├─ ❤ *Healt* : ${user.healt}
├─ ⚡ *Stamina* : ${user.stamina}
├─ 🎫 *Limit* : ${user.limit}
├─ 🎟 ️ *Limit Game* : ${user.game}
├─ 💹 *Money* : ${user.money}
├─ 📊 *Level* : ${user.level}
╰─ ✨ *Exp* : ${user.exp}
`
     conn.sendButtonImg(m.chat, pp, anu, global.wm, 'Inventory Full', '.inv', m)
}
handler.help = ['profile']
handler.tags = ['xp']
handler.register = true
handler.command = /^(my|me|profile|mystats)$/i

module.exports = handler