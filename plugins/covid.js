let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/'+ (text)))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.confirmed) throw 'Masukkan Negara!'
  if (json.confirmed) m.reply(`[ COVID INFO ]
🥀Countries : ${text}
🥀Confirmed : ${json.confirmed.value}
🥀Recovered : ${json.recovered.value}
🥀Deaths : ${json.deaths.value}
🥀Last Update : ${json.lastUpdate}
\n\nMade By ${wm}`.trim())
  else throw json
}
handler.help = ['covid'].map(v => v + ' <negara>')
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19)$/i
//susu, tetek, oppai
module.exports = handler
