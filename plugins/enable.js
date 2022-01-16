let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let setting = global.db.data.settings
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false
  switch (type) {
    case 'w':
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
case 'simi':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.simi = isEnable
      break
   case 'read':
   case 'autoread':
     isAll = true
     if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      setting.autoread = isEnable
      break
   case 'auto':
   case 'autolink':
    isAll = true
    if (!isOwner) {
       global.dfail('owner', m, conn)
       throw false
      }
      setting.auto = isEnable
      break
    case 'antilink':
    case 'antiurl':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiLink = isEnable
      break
    case 'publik':
    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = isEnable
      break
    case 'autolevelup':
    case 'levelup':
      isUser = true
      user.autolevelup = isEnable
      break
    case 'grup':
    case 'gruponly':
    case 'grouponly':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      setting.groupOnly = isEnable
      break
     case 'anon':
     isAll = true
     if (!isOwner) {
         global.dfail('owner', m, conn)
         throw false
        }
        setting.anon = isEnable
        break
    case 'restrict':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      opts['restrict'] = isEnable
      break
    case 'nsfw':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      setting.nsfw = isEnable
      break
    default:
      if (!/[01]/.test(command)) throw `
┌〔 Daftar Opsi 〕${isOwner ? '\n├ autoread\n├ autolink\n├ anon\n├ antispam\n├ autoread\n├ simi\n├ grouponly\n├ nsfw\n├ public\n├ antilink' : ''}
├ autolevelup
├ antilink
├ simi
├ welcome
└────
contoh:
${usedPrefix}on welcome
${usedPrefix}off welcome
`.trim()
      throw false
  }
  m.reply(`
*${type}* berhasil di *${isEnable ? 'Nyala' : 'Mati'}kan* ${isAll ? 'Untuk Bot Ini' : isUser ? '' : 'Untuk Chat Ini'}
`.trim())
}
handler.help = ['enable', 'disable'].map(v => v + ' <opsi>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler
