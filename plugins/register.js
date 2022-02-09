const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix, command, conn }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Kamu sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `contoh:\n*${usedPrefix + command} nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 30) throw 'Lu dah tua anjing'
  if (age < 5) throw 'Mau diban?'
  user.name = name.trim()
  user.age = age
  user.registered = true
  user.regTime =+ new Date
  conn.sendButton(m.chat, `
━━ 「 *Successful Registration* 」━━

╭─• 〘 INFO 〙
│➥ Nama: ${name}
│➥ Umur: ${age} Tahun
│➥ Hadiah: ${pickRandom(['070698', '661528', '878588', '775636', '098786'])}
╰──────•

Ketik *.sn* untuk mendapatkan SERIAL NUMBER
sn digunakan untuk unregister
`.trim(), `Klik Dibawah Untuk Hadiah!\nTerimakasih telah mendaftar :3\n${wm}`, 'Ambil Hadiah', `.codereg ${pickRandom(['070698', '661528', '878588', '775636', '098786'])}`, m)
}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp', 'main']

handler.command = /^(verif(y)?|daftar|reg(ister)?)$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
