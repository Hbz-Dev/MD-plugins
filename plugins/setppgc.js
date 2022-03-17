let handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `balas/kirim gambarnya!`
        conn.updateProfilePicture(m.chat, img)
        m.reply('*Sukses Mengganti Profile Grup!*')
    }
}
handler.help = ['setppgc <reply>']
handler.tags = ['group']
handler.command = /^(setppgc|setppgrup|setppgroup)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler