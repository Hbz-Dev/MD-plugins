let handler = async function (m, { text, command }) {
 if (command == 'ebinary') {
      if (!text || !m.quoted.text) throw `Kirim/reply text dengan caption #${command}`
      let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
      let eb = await eBinary(teks)
      m.reply(eb)
 } else if (command == 'dbinary') {
     if (!text || !m.quoted.text) throw `Kirim/reply text dengan caption #${command}`
     let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
     let db = await dBinary(teks)
     m.reply(db)
  }
}
handler.help = ['ebinary', 'dbinary']
handler.tags = ['tools']

handler.command = /^ebinary|dbinary$/i

module.exports = handler

async function dBinary(str) {
var newBin = str.split(" ")
var binCode = []
for (i = 0; i < newBin.length; i++) {
    binCode.push(String.fromCharCode(parseInt(newBin[i], 2)))
  }
return binCode.join("")
}

async function eBinary(str = ''){    
let res = ''
res = str.split('').map(char => {       
return char.charCodeAt(0).toString(2);  
 }).join(' ')
return res
}
