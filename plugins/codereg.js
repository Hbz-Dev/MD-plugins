let handler = async(m, { conn, args, usedPrefix }) => {

    if (args.length == 0) return conn.reply(m.chat, `Harap masukan code transaksi anda..!!`, m)
    if (args[0] == '070698' || args[0] == '661528' || args[0] == '878588' || args[0] == '775636' || args[0] == '098786' || args[0] == '975485') {

    if (!global.db.data.users[m.sender].code) {
    //if (new Date - global.db.data.users[m.sender].lastcodereg < 889000000000) throw `Anda sudah mengambill code register, Code register anda sudah kadaluarsa..`

    global.db.data.users[m.sender].exp += 4000
    global.db.data.users[m.sender].money += 8000
    global.db.data.users[m.sender].limit += 3
    global.db.data.users[m.sender].pet += 3
    global.db.data.users[m.sender].legendary += 1
    global.db.data.users[m.sender].diamond += 1
    global.db.data.users[m.sender].gold += 1
    global.db.data.users[m.sender].emerald += 2
    global.db.data.users[m.sender].code = true
    chatnye =`Selamat kamu mendapatkan :\n+4000 Exp ✨\n+8000 Money 💹\n+3 Limit 🎫\n+3 Pet Crate 📫\n+1 Legendary 🧰\n+1 Diamond 💎\n+1 Gold👑\n+2 Emerald🧬`
   conn.reply(m.chat, chatnye, m)
} else conn.reply(m.chat, 'Kode anda sudah kadaluarsa.... :(', m)
   } else {
        conn.reply(m.chat, `*「 KODE TIDAK VALID 」*`, m)
    }
}

handler.command = /^(codereg)$/i
handler.register = true

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}