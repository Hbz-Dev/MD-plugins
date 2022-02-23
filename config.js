let fs = require('fs')

global.owner = ['994407430641', '6283844009539'] // Put your number here
global.prems = JSON.parse(fs.readFileSync('./src/premium.json'))
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  melcanz: 'httpa://melcanz.com',
  lol: 'https://api.lolhuman.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'apivproject',
  'https://melcanz.com': 'elaina',
  'https://api.lolhuman.xyz': 'pkebgk8248jskrkfm',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'apivinz',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

// Sticker WM
global.packname = '🌙 Stickers\nBot Whatsapp あ\n\n\n'
global.author = '۰ ⸼'

global.wm = 'ｗｈａｔｓａｐｐ（リ果た）'
global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text='
global.fra = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=booking-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&&fontname=barlow+black+italic&fillTextColor=%23f2aa4c&fillOutlineColor=%23f5c17c&fillOutline2Color=%23f5c17c&useInsetHighlight=false&insetHighlightColor=%23f5c17c&insetHighlightOffset=3&shadowType=0&shadowColor=%2315202b&shadowOpacity=0&backgroundColor=%23101920&text='

global.eror = '_*Server Error*_'

global.multiplier = 40 // The higher, The harder levelup


let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
