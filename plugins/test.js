let util = require('util')
let path = require('path')
let fs = require('fs')

let handler = async (m, { conn }) => {
let ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: 5032,status: 200, thumbnail: fs.readFileSync('./media/1.jpg'), surface: 200, message: `Ara-Ara`, orderTitle: 'Centauri', sellerJid: '0@s.whatsapp.net'}}}
let secs = [{
              title: "Au ah",
              rows: [
                     { title: " ", rowId: " ", description: " " },
                     { title: " ", rowId: " ", description: " " },
                     { title: " ", rowId: " ", description: " " }
                    ]
           }]
                
                   await conn.sendMessage(m.chat, {
                    text: " ",
                    footer: "Test",
                    title: "-------------- [ TEST ] ---------------",
                    buttonText: "uy :v",
                    sections: secs
                }, { quoted: ftroli })
}
handler.customPrefix = /^test/i
handler.command = new RegExp
module.exports = handler