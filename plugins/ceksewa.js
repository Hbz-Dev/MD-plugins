let handler = async (m, { conn, args }) => {
    var now = new Date() * 1
    if (global.db.data.chats[m.chat].expired != 0) {
    m.reply(`Tersisa waktu: ${msToDate(global.db.data.chats[m.chat].expired - now)}`)
    } else {
     m.reply('Tidak Ada Waktu expired di grup ini!')
   }
}
handler.help = ['ceksewa']
handler.tags = ['group']
handler.command = /^(ceksewa|cekexpired)$/i
handler.group = true
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
