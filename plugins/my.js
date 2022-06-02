let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { args }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted && !args[0] ? m.quoted.sender : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => fla + `Profile ${user.name}`)
let anu = `
╭◈ *「 PROFILE 」*
├─ 📇 *Name* : ${user.name}
├─ 🆔 *Nomor* : @${who.split('@')[0]}
├─ 💖 *Pasangan* : ${await conn.getName(user.pasangan) || 'Gapunya :('}
├─ 🎨 *Age* : ${user.age}
├─ 📍 *Role* : ${user.role}
├─ ❤ *Healt* : ${user.healt}
├─ ⚡ *Stamina* : ${user.stamina}
├─ 🎫 *Limit* : ${user.limit}
├─ 🎟 ️ *Limit Game* : ${user.game}
├─ 💹 *Money* : ${user.money}
├─ 📊 *Level* : ${user.level}
╰─ ✨ *Exp* : ${user.exp}
`
     conn.sendButtonImg(m.chat, pp, anu, global.wm, 'All Inventory', '.inv', m, { mentions: [who] })
}
handler.help = ['profile']
handler.tags = ['xp']
handler.register = true
handler.command = /^(my|me|profile|mystats|exp)$/i

module.exports = handler