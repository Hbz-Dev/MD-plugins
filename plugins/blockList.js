let handler = async (m, { conn, isOwner }) => {
let u = await conn.fetchBlocklist()
let a = u.join('\n├\n├ @')
let b = a.replace(/@s.whatsapp.net/g, '')
let c = '@' + b
    let caption = `
┌〔 Daftar Chat TerBlock 〕
├ Total : ${u.length}
├ ${c}
`.trim()
    conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}
handler.help = ['blocklist']
handler.tags = ['owner']
handler.owner = 1
handler.command = /^listblock(ed)?|block(ed)?list|daftarblock(ed)?$/i
module.exports = handler
