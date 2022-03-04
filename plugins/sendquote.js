let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('Reply Pesannya!!')
		let wokwol = await conn.serializeM(await m.getQuotedObj())
		if (!wokwol.quoted) return m.reply('Pesan Yang anda reply tidak mengandung reply')
		await wokwol.quoted.copyNForward(m.chat, true)
}
handler.command = /^q$/i

module.exports = handler
