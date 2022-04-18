let moment = require('moment-timezone')
let handler = m => m

handler.all = async function (m) {

    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    let username = await conn.getName(m.sender)
    let res = await ucapan()
    await conn.sendButton(m.chat, `
*Hai, ${res.ucapan}*\n\n
_${res.ingat}_
\n
${user.banned ? 'Kamu Dibanned!' : 'Saya adalah salah satu bot Whatsapp. harap tidak spam/telpon/minta save kemonor ini. Ada yang bisa saya bantu? :3'}
`.trim(), 'Ketik #menu untuk melihat daftar perintah!', user.registered ? 'Start Anonymous Chat' : 'Verify', user.registered ? '.start' : `.daftar ${username}.15`, m)
    user.pc = new Date * 1
}

module.exports = handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat Dinihari ☀️"
    rus = "Jangan Lupa salat tahajud kak 🌛"
    if (time > 2) {
        rus = "Jangan lupa Sahur kak ♨️"
    }
    if (time >= 4) {
        res = "Selamat Pagi 🌄"
        rus = " "
      if (time == 4) {
        rus = "Jangan lupa salat subuh kak 🌚"
      }
    }
    if (time > 10) {
        res = "Selamat Siang ☀️"
        rus = "Selamat Beraktivitas kak‍ 😉"
    }
    if (time >= 15) {
        res = "Selamat Sore 🌇"
        rus = "Ayo ngabuburit kak 💖"
    }
    if (time >= 18) {
        res = "Selamat Malam 🌙"
        rus = "Jangan Begadang Yah kak🙃"
    }
    return { ucapan: res, ingat: rus }
}