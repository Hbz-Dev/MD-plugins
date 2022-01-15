let levelling = require('../lib/levelling')
const { default: makeWASocket, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, prepareWAMessageMedia, WAMessageStubType } = require('@adiwajshing/baileys-md')
let fs = require('fs')
let path = require('path')
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
  after: 'Dont Spam Bot!\n%me 2.0.0',
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['main', 'rpg', 'absen', 'maker', 'github', 'anime', 'nsfw', 'advanced', 'game', 'xp', 'sticker', 'quotes', 'group', 'premium', 'internet', 'anonymous', 'downloader', 'tools', 'fun', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'rpg') tags = {
    'rpg': 'ʀᴘɢ'
  }
  if (teks == 'main') tags = {
      'main': 'ᴍᴀɪɴ'
  }
  if (teks == 'game') tags = {
    'game': 'ɢᴀᴍᴇ'
  }
  if (teks == 'xp') tags = {
     'xp': 'ᴇxᴘ'
  }
  if (teks == 'sticker') tags = {
    'sticker': 'ᴄᴏɴᴠᴇʀᴛ'
  }
  if (teks == 'maker') tags = {
    'maker': 'ᴍᴀᴋᴇʀ'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Qᴜᴏᴛᴇꜱ'
  }
  if (teks == 'github') tags = {
    'github': 'ɢɪᴛʜᴜʙ'
  }
  if (teks == 'group') tags = {
    'group': 'ɢʀᴏᴜᴘ'
  }
  if (teks == 'premium') tags = {
     'premium': 'ᴘʀᴇᴍɪᴜᴍ'
  }
  if (teks == 'internet') tags = {
    'internet': 'ɪɴᴛᴇʀɴᴇᴛ'
  }
  if (teks == 'anonymous') tags = {
      'anonymous': 'ᴀɴᴏɴʏᴍᴏᴜꜱ'
  }
  if (teks == 'anime') tags = {
     'anime': 'ᴀɴɪᴍᴇ'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'ᴅᴏᴡɴʟᴏᴀᴅᴇʀ'
  }
  if (teks == 'tools') tags = {
    'tools': 'ᴛᴏᴏʟꜱ'
  }
  if (teks == 'fun') tags = {
    'fun': 'ꜰᴜɴ'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'ɴꜱꜰᴡ'
  }
  if (teks == 'absen') tags = {
      'absen': 'ᴀʙꜱᴇɴ'
  }
  if (teks == 'info') tags = {
    'info': 'ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ'
  }
  if (teks == 'owner') tags = {
      'owner': 'ᴏᴡɴᴇʀ',
      'advanced': 'ᴀᴅᴠᴀɴᴄᴇᴅ'
  }



  try {
    let { exp, limit, level, role, money, game, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
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
    let nuun = Math.floor(Math.random() * 5000)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return asu = `
      Haii ${name} 🥀
      ${readMore}
╭────ꕥ 𝐑𝐲𝐮𝐁𝐨𝐭𝐳複 ꕥ────
│✾*_• Creator_*: Unknown
│✾*_• Library_*: Multi Device
│✾*_• Version_*: Beta 3.1.1
│✾*_• Runtime_*: ${uptime} (${muptime})
│✾*_• TotalUser_*: ${totalreg}
│✾*_• UserRegister_*: ${rtotalreg}
│✾*_• TotalHit_*: ${nuun}
╰❑
`  
     let templatee = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    listMessage :{
                    title: asu,
                    description: "Silahkan Pilih Menunya dibawah ini!",
                    buttonText: "CLICK HERE",
                    footerText: wm,
                    listType: "SINGLE_SELECT",
                    sections: [{
                      rows: [{
                          title: "[ 🌟 ] Allmenu",
                          rowId: `${_p}id10`,
                          description: "[ Menampilkan Semua Menu Yang ada di bot ]"
                        },
                        {
                        title: "[ ℹ ] Information",
                        rowId: `${_p}? info`,
                        description: "[ Menampilkan Menu Information ]"
                        },
                        {
                        title: "[ 🌐 ] Internet",
                        rowId: `${_p}? internet`,
                        description: "[ Menampilkan Menu Internet ]"
                        },
                        {
                        title: "[ 👥 ] Group",
                        rowId: `${_p}? group`,
                        description: "[ Menampilkan Menu Group ]"
                        },
                        {
                        title: "[ 👑 ] Premium",
                        rowId: `${_p}? premium`,
                        description: "[ Note: Hanya user premium yang bisa mengakses! ]"
                        },
                        {
                        title: "[ 🥀 ] Quotes",
                        rowId: `${_p}? quotes`,
                        description: "[ Menampilkan Menu Quotes ]"
                        },
                        {
                        title: "[ 📲 ] Downloader",
                        rowId: `${_p}? downloader`,
                        description: "[ Menampilkan Menu Downloader ]"
                        },
                        {
                        title: "[ 🎖 ] Fun",
                        rowId: `${_p}? fun`,
                        description: "[ Menampilkan Menu Fun ]"
                        },
                        { 
                        title: "[ 🎛 ] Github",
                        rowId: `${_p}? github`,
                        description: "[ Menampilkan Menu Github ]"
                        },
                        {
                        title: "[ ✏ ] Maker",
                        rowId: `${_p}? maker`,
                        description: "[ Menampilkan Menu Maker ]"
                        },
                        {
                        title: "[ 🔰 ] Rpg",
                        rowId: `${_p}? rpg`,
                        description: "[ Menampilkan Menu rpg ]"
                        },
                        {
                        title: "[ 📒 ] Main",
                        rowId: `${_p}? main`,
                        description: "[ Menampilkan Menu Utama ]"
                        },
                        {
                        title: "[ 🎏 ] Anime",
                        rowId: `${_p}? anime`,
                        description: "[ Menampilkan Menu Anime ]"
                        },
                        {
                        title: "[ ⚙ ] Convert",
                        rowId: `${_p}? sticker`,
                        description: "[ Menampilkan Menu Convert/sticker ]"
                        },
                        {
                        title: "[ 🎮 ] Game",
                        rowId: `${_p}? game`,
                        description: "[ Menampilkan Menu Game ]"
                        },
                        {
                        title: "[ 🛠 ] Tools",
                        rowId: `${_p}? tools`,
                        description: "[ Menampilkan Menu Tools ]"
                        },
                        {
                        title: "[ 💰 ] User info",
                        rowId: `${_p}? xp`,
                        description: "[ Menampilkan Menu User ]"
                        },
                        {
                        title: "[ 🌍 ] Anonymous",
                        rowId: `${_p}? anonymous`,
                        description: "[ Menampilkan Menu Anonymous ]"
                        },
                        {
                        title: "[ 🙋‍♂️ ] Absen",
                        rowId: `${_p}? absen`,
                        description: "[ Menampilkan Menu Absen ]"
                        },
                        {
                        title: "[ 🔞 ] Nsfw",
                        rowId: `${_p}? nsfw`,
                        description: "[ Note: Fitur Ini Mengandung 18+!\membutuhkan Mode nsfw nyala! ]"
                        },
                        {
                        title: "[ ⛔ ] Owner",
                        rowId: `${_p}? owner`,
                        description: "[ Khusus Owner saja! ]"
                        }]
                    }]
                }
            }), { quoted: m })
            conn.relayMessage(m.chat, templatee.message, { messageId: templatee.key.id })
         }
    
      for (let plugin of help)
        if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
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
      level, game, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
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
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = 1

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