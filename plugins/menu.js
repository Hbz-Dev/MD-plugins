const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fs = require('fs')
let path = require('path')
let levelling = require('../lib/levelling')
let tags = {
  'main': 'ᴍᴀɪɴ',
  'anonymous': 'ᴀɴᴏɴʏᴍᴏᴜꜱ',
  'game': 'ɢᴀᴍᴇ',
  'rpg': 'ʀᴘɢ',
  'xp': 'ᴇxᴘ',
  'premium': 'ᴘʀᴇᴍɪᴜᴍ',
  'group': 'ɢʀᴏᴜᴘ',
  'absen': 'ᴀʙꜱᴇɴ',
  'owner': 'ᴏᴡɴᴇʀ',
  'fun': 'ꜰᴜɴ ᴍᴇɴᴜ',
  'sticker': 'ᴄᴏɴᴠᴇʀᴛ',
  'maker': 'ᴍᴀᴋᴇʀ',
  'github': 'ɢɪᴛʜᴜʙ',
  'internet': 'ɪɴᴛᴇʀɴᴇᴛ',
  'anime': 'ᴀɴɪᴍᴇ',
  'downloader': 'ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
  'nsfw': 'ɴꜱꜰᴡ',
  'tools': 'ᴛᴏᴏʟꜱ',
  'advanced': 'ᴀᴅᴠᴀɴᴄᴇᴅ',
  'quotes': 'Qᴜᴏᴛᴇꜱ',
  'info': 'ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ',
}
const defaultMenu = {
  before: `*_HAI %name 🥀_*

🕛 Time: %time
📅 Date: %date

❑ 「 INFO USER 」
• Name: %name
• Limit: %limit
• Limit Game: %game
• Money: %money
• Level: %level (%exp / %maxexp)
• Totalexp: %totalexp
• Role: %role

%readmore`.trimStart(),
  header: '❑ 「 *%category* 」',
  body: '➜ _%cmd_ %islimit %isPremium',
  footer: '\n',
  after: 'Dont Spam Bot!\nV2.0.0',
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role, game } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(𝙻𝚒𝚖𝚒𝚝)' : '')
                .replace(/%isPremium/g, menu.premium ? '(ᴘʀᴇᴍɪᴜᴍ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      sender: m.sender,
      xp4levelup: max - exp,
      level, game, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let ob = ['1', '2', 'su', '1', '4', 'su', '4', '2', '1', '2']
    let gb = ob[Math.floor(Math.random() * ob.length)]
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: text.trim(),
           locationMessage: { 
           jpegThumbnail: fs.readFileSync(`./media/${gb}.jpg`) },
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: '𝙶𝚒𝚝𝚑𝚞𝚋',
               url: `Github Owner ${conn.user.name}`
             }

           },
             {
             urlButton: {
               displayText: 'ᴊᴀꜱᴀ ɪᴋʟᴀɴ ᴅɪꜱɪɴɪ',
               url: '\nHubungi Owner untuk memasang iklan disini'
             }

           },
               {
             quickReplyButton: {
               displayText: ' 𝙊𝙬𝙣𝙚𝙧 ',
               id: '.owner',
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(menu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 13

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}