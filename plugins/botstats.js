let handler = async (m, { conn }) => {
    let { anon, nsfw, auto, autoread, groupOnly, queque, antispam, self } = global.db.data.settings

    const chats = Object.keys(await conn.chats)
    const groups = Object.keys(await conn.groupFetchAllParticipating())
    const block = await conn.fetchBlocklist()
    
    let uptime = clockString(process.uptime() * 1000)


    m.reply(`
┌─〔 Status 〕
├ Aktif selama ${uptime}
├ *${groups.length}* Grup
├ *${chats.length - groups.length}* Chat Pribadi
├ *${Object.keys(global.db.data.users).length}* Pengguna
├ *${block.length}* Terblock
├ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Group Terbanned
├ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
└────

┌─〔 Pengaturan 〕
├ ${anon ? '✅' : '❌'} *Anon Chat*
├ ${nsfw ? '✅' : '❌'} *Nsfw*
├ ${queque ? '✅' : '❌'} *Queque*
├ ${autoread ? '✅' : '❌'} *Auto Read*
├ ${groupOnly ? '✅' : '❌'} *Mode Grup Only*
├ ${antispam ? '✅' : '❌'} *Antispam*
├ ${auto ? '✅' : '❌'} *Kick & Forward*
├ ${self ? '✅' : '❌'} *Mode Self*
└────
    `.trim())
}
handler.help = ['stats']
handler.tags = ['info', 'main']
handler.command = /^(stat?s?|bot(stat?s?))$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
