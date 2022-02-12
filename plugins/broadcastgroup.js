let fs = require('fs')
let handler = m => m
handler.after = async function (m, { text }) {
                if (!text) throw `Masukkan Textnya!`
                let getGroups = await this.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
                for (let i of anu) {
                    await sleep(1500)
                    await this.butct(i, '[ *Broadcast* ]\n\n'+text, `ALL GROUP BROADCAST`, m.sender, fs.readFileSync('./media/1.jpg'), 'MENU', '.help')
                }
                m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }