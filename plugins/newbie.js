let handler = async (m) => {
  let user = global.db.data.users[m.sender]
  if (user.regTime) return m.reply('Kamu sudah mengambil bonus newbie mu!')
  user.money += 5000
  user.diamond += 2
  user.regTime = +new Date
  m.reply('Berhasil mengambil hadiah new user!\nMendapatkan:\n*1. Diamond 2*\n*2. Money 5K*!')
}
handler.command = /^newbie$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
