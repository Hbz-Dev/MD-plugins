let handler  = async (m, { conn, text }) => {
	let users = global.db.data.users

  var total = 0
  for (let jid in users){
    if (users[jid].limit < 0){
      users[jid].limit = 0
      total+=1
    }
    if (users[jid].money < 0){
      users[jid].money = 0
      total+=1
    }
    if (users[jid].health < 0){
      users[jid].health = 0
      total+=1
    }
    if (users[jid].health > 101){
      users[jid].health = 100
      total+=1
    }
    users[jid].money = Math.floor(users[jid].money)
    users[jid].limit = Math.floor(users[jid].limit)
  }
  return conn.reply(m.chat,`*Berhasil memperbaiki ${total} error di database.*`,m)
}
handler.help = ['fix'].map(v => v + ' <database>')
handler.tags = ['owner']
handler.command = /^(fix)$/i
handler.owner = 1

module.exports = handler