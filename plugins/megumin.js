let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/sfw/megumin')
  if (!res.ok) throw 'Error Website sedang down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  /*let buttons = [
                    {buttonId: `.megumin`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: `${json.url}` },
                    caption: 'Nih Kak ^^',
                    footer: 'Megumin Wangyy ~\nMade By '+ wm,
                    buttons: buttons,
                    headerType: 4
                }
                conn.sendMessage(m.chat, buttonMessage, { quoted: m })*/
  //conn.but(m.chat, 'Nih kak ^^', 'Megumin Wangyy\nMade By '+wm, m.sender, 'NEXT', '.megumin', `${json.url}`, m)
  conn.sendButtonImg(m.chat, json.url, 'Megumin Wangyy', json.url, 'Get Again', '.megumin', m)
}
handler.help = ['megumin']
handler.tags = ['anime']
handler.command = /^(megumin)$/i

handler.limit = 1

module.exports = handler
