let fetch = require('node-fetch')

let handler = async (m, { conn }) => {
	let { lasthunt, lastbansos, lastlabirin, lastadventure, lastfishing, lastduel, lastmining, lastdungeon, lastclaim, lastweekly, lastmonthly } = global.db.data.users[m.sender]
    //let pp = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=Inventory'
    let pp = await (await fetch(fla + 'Cooldown')).buffer()
    let str = `
*—「 🕖 Cooldown 」—* \n${readMore}
*Last Berburu :* ${lasthunt > 0 ? '❌' : '✅'}
*Last Memancing :* ${lastfishing > 0 ? '❌' : '✅'}
*Last Labirin :* ${lastlabirin > 0 ? '❌' : '✅'}
*Last Adventure :* ${lastadventure > 0 ? '❌' : '✅'}
*Last Duel :* ${lastduel > 0 ? '❌' : '✅'}
*Last Dungeon :* ${lastdungeon > 0 ? '❌' : '✅'}
*Last Mining :* ${lastmining > 0 ? '❌' : '✅'}
*Last Bansos :* ${lastbansos > 0 ? '❌' : '✅'}
*Last Claim :* ${lastclaim > 0 ? '❌' : '✅'}
*Last Weekly :* ${lastweekly > 0 ? '❌' : '✅'}
*Last Monthly :* ${lastmonthly > 0 ? '❌' : '✅'}
\n
`.trim()
    conn.send2ButtonLoc(m.chat, pp, str, global.wm, `Inventory`, `.inv`, `Profile`, `.profile`)
}
handler.help = ['cooldown']
handler.tags = ['rpg']
handler.command = /^(cooldown|cdw)$/i
handler.register = true
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)