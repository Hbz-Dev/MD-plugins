let fs = require('fs')
let handler = m => m
handler.after = async function (m, { text }) {
                if (!text) throw `Masukkan Textnya!`
                let getGroups = await this.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                let ftroli = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: Math.floor(Math.random() * 100000),status: 200, thumbnail: require('fs').readFileSync('./media/bc.jpg'), surface: 200, message: `ALL GROUPS BROADCAST`, orderTitle: 'Centauri', sellerJid: '0@s.whatsapp.net'}}}
                m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
                for (let i of anu) {
                    await sleep(1500)
                    await conn.sendButton(i, text + '\n' + readMore + '\n「 All Groups Broadcast 」\n', global.wm, 'MENU', '.menu', ftroli)
                }
                m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }