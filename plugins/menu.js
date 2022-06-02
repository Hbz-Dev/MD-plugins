const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let levelling = require('../lib/levelling')
let tags = {
  'main': 'ᴍᴀɪɴ',
  'anonymous': 'ᴀɴᴏɴʏᴍᴏᴜꜱ',
  'game': 'ɢᴀᴍᴇ',
  'rpg': 'ʀᴘɢ',
  'jodoh': 'ᴊᴀᴅɪᴀɴ',
  'xp': 'ᴇxᴘ',
  'premium': 'ᴘʀᴇᴍɪᴜᴍ',
  'group': 'ɢʀᴏᴜᴘ',
  'absen': 'ᴀʙꜱᴇɴ',
  'vote': 'ᴠᴏᴛᴇ',
  'owner': 'ᴏᴡɴᴇʀ',
  'fun': 'ꜰᴜɴ',
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
  before: `Hi, %name ☬

• Date      : %date
• Runtime   : %muptime
• Time      : %time
• TotalUser  : %totalreg

INFO MENU:
 🅟 : Khusus Premium
 🅛 : Memakai Limit
 
%readmore`.trimStart(),
  header: '╭─ꕥ「 *%category* 」',
  body: '│☄︎ %cmd %islimit %isPremium',
  footer: '╰❑\n',
  after: `*${global.wm}* || Dont spam bot!`,
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  if (global.db.data.settings.setmenu !== 'all') return handler.disabled = true
  conn.menu = conn.menu ? conn.menu : {}
  let gjk = m.chat
  if (gjk in conn.menu) {
   global.db.data.stats[m.plugin].total -= 1
   return conn.reply(gjk, `Maaf @${m.sender.split('@')[0]},\nUntuk menghindari spam, menu hanya akan ditampilkan 1x setiap 3 menit\nKamu bisa scroll keatas untuk melihat menu sebelumnya!`, conn.menu[gjk])
  }
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role, game } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = '@' + m.sender.split('@')[0]
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
    let _ramadhan = new Date("April 02 2022 00:00:00").getTime()
    let _lebaran = new Date("May 03 2022 00:00:00").getTime()
    let dann = new Date().getTime()
    let ramadhan = msToDate(_ramadhan - dann)
    let lebaran = msToDate(_lebaran - dann)
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
                .replace(/%islimit/g, menu.limit ? '(🅛)' : '')
                .replace(/%isPremium/g, menu.premium ? '(🅟)' : '')
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
      p: _p, uptime, muptime, ramadhan,
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
    let gb = global.loli[Math.floor(Math.random() * 352)]
    conn.menu[gjk] = await conn.send2ButtonImg(m.chat, gb, text.trim(), global.wm, 'Rules', '.rules', 'Owner', '.owner', m, { mentions: [m.sender] })
    conn.sendMessage(m.chat, { react: { text: '👑', key: conn.menu[gjk].key, }})
    setTimeout(() => {
                  delete conn.menu[gjk]
               }, 180000)
     /*const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: text.trim(),
           locationMessage: { 
           jpegThumbnail: fs.readFileSync(`./media/${gb}.jpg`) },
           hydratedFooterText: `Hitung Mundur Lebaran:\n${lebaran}\n\n${wm}`,
           hydratedButtons: [{
             urlButton: {
               displayText: 'Github',
               url: `https://github.com/WhatsAppCode-Official`
             }

           },
             {
             urlButton: {
               displayText: 'Group Whatsapp',
               url: `https://chat.whatsapp.com/LG1e7OFZMg1JfQmJsM8use`
             }
             
           },
             {
             urlButton: {
               displayText: `Source Code`,
               url: 'https://wibusoft.com'
             }

           },
               {
             quickReplyButton: {
               displayText: 'ランダムな',
               id: `.sms ${ys}`,
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
     )*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.register = true
handler.exp = 45

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " Hari " + hours + " Jam " + minutes + " Menit";
    // +minutes+":"+sec;
}

/*async function genProfile(conn, m) {
  let jimp = require('jimp')
  let PhoneNumber = require('awesome-phonenumber')
  let thumbnailUrl = [
  'https://telegra.ph/file/81260a8b9e8cff26d2b48.jpg', 'https://telegra.ph/file/ac4928f0824a2a0492737.jpg',
  'https://telegra.ph/file/6359b013bc7e52c3b346f.jpg', 'https://telegra.ph/file/d43c89a5d2da72875ec05.jpg',
  'https://telegra.ph/file/7d6c0e35f9c8f52715541.jpg', 'https://telegra.ph/file/ef4b742d47e6a9115e2ff.jpg',
  'https://telegra.ph/file/55e5af5f33fbd57104187.jpg', 'https://telegra.ph/file/af236598456b95884bd15.jpg',
  'https://telegra.ph/file/de92ed4a729887ffc974c.jpg', 'https://telegra.ph/file/00ce42a193b1dbbf907d4.jpg'
]
  let font = await jimp.loadFont('./names.fnt'),
    mask = await jimp.read('https://i.imgur.com/552kzaW.png'),
    welcome = await jimp.read(thumbnailUrl[Math.floor(Math.random() * thumbnailUrl.length)]),
    avatar = await jimp.read(await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')),
    status = (await conn.fetchStatus(m.sender).catch(console.log) || {}).status?.slice(0, 30) || 'Not Detected'

    await avatar.resize(460, 460)
    await mask.resize(460, 460)
    await avatar.mask(mask)
    await welcome.resize(welcome.getWidth(), welcome.getHeight())

    await welcome.print(font, 550, 180, 'Name:')
    await welcome.print(font, 650, 255, m.pushName.slice(0, 25))
    await welcome.print(font, 550, 340, 'About:')
    await welcome.print(font, 650, 415, status)
    await welcome.print(font, 550, 500, 'Number:')
    await welcome.print(font, 650, 575, PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international'))
    return await welcome.composite(avatar, 50, 170).getBufferAsync('image/png')
}*/