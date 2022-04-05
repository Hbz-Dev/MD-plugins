let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('Pilihan menu:\n1. all\n2. default')
  if (args[0] == 'all') {
  global.db.data.settings.setmenu = 'all'
  m.reply('Sukses Mengganti Model menu ke all!')
  } else {
  global.db.data.settings.setmenu = 'default'
  m.reply('Sukses Mengganti Model menu ke default!')
 }
}
handler.help = ['setmenu']
handler.tags = ['owner']
handler.command =/^(setmenu)$/i
handler.owner = 1

module.exports = handler