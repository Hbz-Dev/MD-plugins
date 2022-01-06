let handler = m => m
handler.after = async function (m, { args }) {
                let text = args[0]
                let getGroups = await this.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
                let teks = text ? text : cc.text
                m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
                for (let i of anu) {
                    await sleep(1500)
                    await this.copyNForward(i, this.cMod(i, cc, /bc|broadcast/i.test(teks) ? teks : '「 *𝐑𝐲𝐮𝐁𝐨𝐭𝐳-𝐌𝐃複 Broadcast* 」\n\n' + teks + '\n\n#izin'), true).catch(_ => _)
                }
                m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc2'].map(v => v + ' <Reply media|text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group2|grup2|gc2)$/i
handler.owner = true

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    } 