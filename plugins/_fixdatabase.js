let handler = m => m
handler.after = async (m) => {	
  let users = global.db.data.users
  let jid = m.sender
    if (users[jid].limit < 0){
      users[jid].limit = 0
    }
    if (users[jid].money < 0){
      users[jid].money = 0
    }
    if (users[jid].healt < 0){
      users[jid].healt = 0
    }
    if (users[jid].healt > 100){
      users[jid].healt = 100
    }
    if (users[jid].stamina < 0){
      users[jid].stamina = 0
    }
    if (users[jid].stamina > 100){
      users[jid].stamina = 100
    }
    if (users[jid].exp < 0){
      users[jid].exp = 0
    }
}

module.exports = handler