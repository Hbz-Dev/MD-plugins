let fetch = require('node-fetch')
let fs = require('fs')
let handler = async(m, { text, command, groupMetadata, conn }) => {
    if (command == "afk") {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    let a = await (await fetch(fla + `${user.name} AFK!`)).buffer()
    let b = a
    try {
        a = await conn.profilePictureUrl(m.sender, 'image')    
        b = await (await fetch(a)).buffer()
    } catch (e) {}
    let buttons = [{buttonId: `#say Ok ^^`, buttonText: {displayText: 'Iyaaaa'}, type: 1}]
    let str = `╭──[ *NOW AFK !* ]──✧
┆ *Nama* : @${m.sender.split('@')[0]}
┆ *Alasan* : ${text ? '' + text : 'Tanpa Alasan'}
┆
┆  ~ *(Away From Keyboard)* ~
╰┅────★`.trim()
return conn.sendMessage(m.chat, { caption: str, location: { jpegThumbnail: b }, buttons: buttons, footer: 'Jangan Diganggu Yahhhh🥀', headerType: 'LOCATION', mentions: conn.parseMention(str) })
} else if (command == "pesan") {
 if (!text) return
 await conn.reply(text, `*@${m.sender.split('@')[0]}* Mencarimu ketika kamu sedang afk!\n\n*Group:* ${m.isGroup ? groupMetadata.subject : 'Tidak Diketahui'}`, null, { mentions: [m.sender] })
 m.reply('_Sukses meninggalkan pesan kepada user_')
 }
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk|pesan$/i

module.exports = handler