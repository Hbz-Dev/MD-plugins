let handler = async (m, { conn, args }) => {

	if (!args[0]) {
     let secs = [{ title: "Group Setting", rows: [ { title: "Tutup Grup", rowId: "#grup close", description: "Menutup Group" }, { title: "Buka Grup", rowId: "#grup open", description: "Membuka Grup" }, { title: "Everyone", rowId: "#grup unlocked", description: "Membuat grup dapat diubah Oleh semua member grup!" }, { title: "Admin only", rowId: "#group locked", description: "Mengunci agar hanya admin yg bisa merubah grup" } ] }] 
     await conn.sendMessage(m.chat, { text: "Silahkan Pilih Melalui Tombol Dibawah.", footer: global.wm, title: "*───────[ GROUP SETTING ]───────*", buttonText: "Set Group", sections: secs }, { quoted: m })
     throw false
	}
	if (args[0].toLowerCase() === 'close') {
	await conn.groupSettingUpdate(m.chat, 'announcement')
	} else if (args[0].toLowerCase() === 'locked') {
    await conn.groupSettingUpdate(m.chat, 'locked')
    } else if (args[0].toLowerCase() === 'unlocked') {
    await conn.groupSettingUpdate(m.chat, 'unlocked') 
	} else if (args[0].toLowerCase() === 'open') {
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
  } else throw 'Hanya open/close/locked/unlocked pilihannya!'
}
handler.help = ['grup <opts>']
handler.tags = ['group']
handler.command = /^gr(oup|up)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler