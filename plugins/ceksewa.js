let handler = async (m, { conn, args }) => {
    var now = new Date() * 1
    
    let who
    if (m.isGroup) who = args[0] ? args[0] : m.chat
    else who = args[0]
    
    let gc = await conn.groupMetadata(who)
    if (global.db.data.chats[who].expired != 0) {
    m.reply(`Tersisa waktu: ${msToDate(global.db.data.chats[who].expired - now)}\n*Group: _${gc.subject}_*`)
    } else {
     m.reply(`Tidak Ada Waktu Expired Di Group ${gc.subject}!`)
   }
}
handler.help = ['ceksewa']
handler.tags = ['group']
handler.group = true
handler.command = /^(ceksewa|cekexpired)$/i
module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}
