let handler = async (m, { conn, args }) => {

	if (!args[0]) {
		await conn.send3Button(m.chat, `*───────[ GROUP SETTING ]───────*
	`.trim(),`                     ${wm}\n`, 'Open', ',grup open', 'Close', ',grup close', 'Locked', ',grup locked', m)
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