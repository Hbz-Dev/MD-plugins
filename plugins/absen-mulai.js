let handler = async (m, { usedPrefix, text, conn }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        throw conn.sendButton(m.chat, `_*Masih ada sesi absen di grup ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen <admin only>`, `Alasan sesi absen: ${conn.absen[id][2]}\n${wm}`, 'Hapus Absen!', '.hapusabsen', m)
    }
    conn.absen[id] = [
        conn.send3Button(m.chat, `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`, 'Absen Klik Dibawah', 'Absen 1', '.absen', 'Absen 2', '.absen', 'Absen 3', '.absen', m),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['absen']
handler.command = /^(start|mulai)absen$/i
handler.group = true
handler.admin = true
module.exports = handler
