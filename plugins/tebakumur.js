/**
* cuma mau bilang terimakasih ama https://github.com/uhdahlah
**/

let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Masukan Nama Orang yg ingin ditebak umurnya!', m)
    let hehe = Math.floor(Math.random() * 30)
    if (hehe == 0 || hehe == 1 || hehe == 2 || hehe == 3 || hehe == 4 || hehe == 5 || hehe == 6 || hehe == 7 || hehe == 8) throw `Namamu : ${text}\nUmurmu : 15`
    await m.reply('Searching...')
    let hasil = `Namamu : ${text}\nUmurmu : ${hehe}`
    conn.reply(m.chat, hasil, m)
    
}
handler.help = ['tebakumur'].map(v => v + ' <nama>')
handler.tags = ['internet', 'fun']
handler.command = /^(tebakumur)$/i
handler.exp = 10
// https://github.com/uhdahlah
module.exports = handler
