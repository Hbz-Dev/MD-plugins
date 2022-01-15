let handler = async (m, { conn }) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    await m.reply('Sedang Mereset Bot...\nMohon tunggu sekitar 1 menit')
    await global.db.write()
    process.send('reset')
}
handler.help = ['debounce' + (process.send ? '' : ' (Tidak Bekerja)')]
handler.tags = ['host']
handler.command = /^debounce$/i

handler.owner = true

module.exports = handler