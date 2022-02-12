let handler = async (m, { conn, args }) => {

	if (!args[0]) {
		await conn.send2Button(m.chat, `*───────[ GROUP SETTING ]───────*
	`.trim(),`                     ${wm}\n`, 'Open', ',grup 1', 'Close', ',grup 0')
		throw false
	}
	if (args[0].toLowerCase() === 'close') {
	await conn.groupSettingUpdate(m.chat, 'announcement')
	} else if (args[0].toLowerCase() === 'open') {
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
  } else throw 'Hanya open/close pilihannya!'
}
handler.help = ['grup <close/open>']
handler.tags = ['group']
handler.command = /^gr(oup|up)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler