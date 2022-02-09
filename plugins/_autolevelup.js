let levelling = require('../lib/levelling')
let fs = require('fs')

let handler = m => m

handler.before = async function (m) {
        let user = global.db.data.users[m.sender]
        if (!user.autolevelup) return !0
        let users = Object.entries(global.db.data.users).map(([key, value]) => {
                return { ...value, jid: key }
        })
        let pp = fs.readFileSync('./src/avatar_contact.png')
        let buttons = [{buttonId: `.my`, buttonText: {displayText: 'My Profile'}, type: 1}]
        let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
        let usersLevel = sortedLevel.map(enumGetKey)
        let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
        try {
        pp = await this.profilePictureUrl(m.sender, 'image')
        } catch (e) {
        } finally {
     
                let before = user.level * 1
                while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++

             
                if (before !== user.level) {
                        //await this.reply(m.chat, `*@${m.sender.split('@')[0]} Naik Level!*\n\n*${before}* ➞ *${user.level}*\n\nGunakan *.my* Untuk mengecek!\n*.disable autolevelup* Untuk mematikan auto levelup`, m, { mentions: [m.sender], jpegThumbnail: pp })
                        await this.sendMessage(m.chat, { caption: `*@${m.sender.split('@')[0]} Naik Level!*\n\n*${before}* ➞ *${user.level}*\n\nTekan tombol dibawah Untuk mengecek!\n*.disable autolevelup* Untuk mematikan auto levelup`, location: { jpegThumbnail: pp }, buttons: buttons, footer: `AUTOLEVELUP📌\n${wm}`, headerType: 'LOCATION', mentions: [m.sender] })
                }
        }
}
module.exports = handler

function sort(property, ascending = true) {
        if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
        else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
        if (property) return (a, i, b) => {
                return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
        }
        else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
        return a.jid
}