let fetch = require('node-fetch')

let handler = async (m, { conn, command, usedPrefix }) => {
  if (/^tod$/i.test(command)) {
    await conn.send3Button(m.chat, 'Truth or Dare', wm, 'Truth', `${usedPrefix}truth`, 'Dare', `${usedPrefix}dare`, 'Acak', `${conn.pickRandom([`${usedPrefix}dare`, `${usedPrefix}truth`])}`, m)
  }
  if (/^truth$/i.test(command)) {
    let res = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json')).json()
    conn.send2Button(m.chat, res.result, wm, 'Truth', `${usedPrefix}truth`, 'Dare', `${usedPrefix}dare`, m)
  }
  if (/^dare$/i.test(command)) {
    let res = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json')).json()
    let result = res[Math.floor(Math.random() * res.length)]
    conn.send2Button(m.chat, result, wm, 'Truth', `${usedPrefix}truth`, 'Dare', `${usedPrefix}dare`, m)
  }
}
handler.help = ['tod']
handler.tags = ['fun']
handler.command = /^(tod|truth|dare)$/i

module.exports = handler 