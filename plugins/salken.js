let handler  = async (m, { conn, usedPrefix }) => { 
	conn.sendButton(m.chat, `Halo Kak👋\nSaya adalah ShinoaBot\nShinoaBot adalah Sebuah Bot yang bisa membantumu di grup ini, klik tombol dibawah ini jika kamu ingin menggunakan bot!`.trim(), global.wm, '⋮☰ Menu', '.menu', m)
	}

handler.command = /^(salken)$/i

module.exports = handler