let handler = async (m, { conn, args: [event], text }) => {
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let participants = who.length ? who : [m.sender]
    let action = false
    m.reply(`Simulating ${event}...`)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            action = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            action = 'remove'
            break
        case 'promote':
            action = 'promote'
            break
        case 'demote':
            action = 'demote'
            break
        default: throw `List Event: welcome, bye, promote, demote`
    }
    if (action) return conn.participantsUpdate({ id: m.chat, participants: [m.sender], action: action })
    //return conn.onDelete(m)
}
handler.help = ['simulate <event>']
handler.tags = ['owner', 'group']
handler.admin = true

handler.command = /^simulate$/i
module.exports = handler

