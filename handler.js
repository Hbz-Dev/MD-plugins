const simple = require('./lib/simple')
const util = require('util')
const fetch = require('node-fetch')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    async handler(chatUpdate) {
        if (global.db.data == null) await loadDatabase()
        this.msgqueque = this.msgqueque || []
        // console.log(chatUpdate)
        if (!chatUpdate) return
        // if (chatUpdate.messages.length > 2 || !chatUpdate.messages.length) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        console.log(JSON.stringify(m, null, 4))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
           /*switch (m.mtype) {
		case "imageMessage": 
		case "videoMessage":
		case "audioMessage":
		case "stickerMessage":
		case "documentMessage":
        case "senderKeyDistributionMessage":
			if (!m.key.fromMe) await delay(1000)
			quoted = m.msg ? m.msg.url : m.quoted.url
			if (!quoted) await this.refreshMediaConn(true)
		    break
            }*/
            m.exp = 0
            m.limit = false
            m.game = false
            try {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') global.db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.limit)) user.limit = 20
                    if (!isNumber(user.game)) user.game = 30
                    if (!isNumber(user.pc)) user.pc = 0
                    if (!('pasangan' in user)) user.pasangan = ''
                    if (!('code' in user)) user.code = false
                    if (!('registered' in user)) user.registered = true
                    if (!user.registered) {
                        if (!('name' in user)) user.name = m.name
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.regTime)) user.regTime = -1
                        if (!('role' in user)) user.role = 'Beginner'
                    }
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!('afkReason' in user)) user.afkReason = ''
                    if (!('banned' in user)) user.banned = false
                    if (!isNumber(user.warn)) user.warn = 0
                    if (!isNumber(user.level)) user.level = 0
                    if (!('autolevelup' in user)) user.autolevelup = false

                    if (!isNumber(user.money)) user.money = 0
                    if (!isNumber(user.healt)) user.healt = 100
                    if (!isNumber(user.stamina)) user.stamina = 100
                    if (!isNumber(user.potion)) user.potion = 0
                    if (!isNumber(user.sampah)) user.sampah = 0
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.string)) user.string = 0
                    if (!isNumber(user.makananpet)) user.makananpet = 0

                    if (!isNumber(user.emerald)) user.emerald = 0
                    if (!isNumber(user.diamond)) user.diamond = 0
                    if (!isNumber(user.gold)) user.gold = 0
                    if (!isNumber(user.iron)) user.iron = 0
                    
                   if (!isNumber(user.banteng)) user.banteng = 0
                   if (!isNumber(user.harimau)) user.harimau = 0
                   if (!isNumber(user.gajah)) user.gajah = 0
                   if (!isNumber(user.kambing)) user.kambing = 0
                   if (!isNumber(user.panda)) user.panda = 0
                   if (!isNumber(user.buaya)) user.buaya = 0
                   if (!isNumber(user.kerbau)) user.kerbau = 0
                   if (!isNumber(user.sapi)) user.sapi = 0
                   if (!isNumber(user.monyet)) user.monyet = 0
                   if (!isNumber(user.ikan)) user.ikan = 0
                   if (!isNumber(user.lele)) user.lele = 0
                   if (!isNumber(user.ayam)) user.ayam = 0
                   
                  if (!isNumber(user.ayamb)) user.ayamb = 0
                  if (!isNumber(user.ayamg)) user.ayamg = 0
                  if (!isNumber(user.sapir)) user.sapir = 0
                  if (!isNumber(user.ssapi)) user.ssapi = 0
                  if (!isNumber(user.leleg)) user.leleg = 0
                  if (!isNumber(user.leleb)) user.leleb = 0
                  if (!isNumber(user.ikanb)) user.ikanb = 0
                  if (!isNumber(user.ikang)) user.ikang = 0

                    if (!isNumber(user.common)) user.common = 0
                    if (!isNumber(user.uncommon)) user.uncommon = 0
                    if (!isNumber(user.mythic)) user.mythic = 0
                    if (!isNumber(user.legendary)) user.legendary = 0
                    if (!isNumber(user.pet)) user.pet = 0

                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudaexp)) user.kudaexp = 0
                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucingexp)) user.kucingexp = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahexp)) user.rubahexp = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjingexp)) user.anjingexp = 0

                    if (!isNumber(user.kudalastfeed)) user.kudalastfeed = 0
                    if (!isNumber(user.kucinglastfeed)) user.kucinglastfeed = 0
                    if (!isNumber(user.rubahlastfeed)) user.rubahlastfeed = 0
                    if (!isNumber(user.anjinglastfeed)) user.anjinglastfeed = 0

                    if (!isNumber(user.armor)) user.armor = 0
                    if (!isNumber(user.armordurability)) user.armordurability = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0

                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!isNumber(user.lastbansos)) user.lastbansos = 0
                    if (!isNumber(user.lastlabirin)) user.lastlabirin = 0
                    if (!isNumber(user.lastdaily)) user.lastdaily = 0
                    if (!isNumber(user.lastexp)) user.lastexp = 0
                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastfishing)) user.lastfishing = 0
                    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                    if (!isNumber(user.lastduel)) user.lastduel = 0
                    if (!isNumber(user.lastmining)) user.lastmining = 0
                    if (!isNumber(user.lasthunt)) user.lasthunt = 0
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
                    
                    if (!isNumber(user.warning)) user.warning = 0
                } else global.db.data.users[m.sender] = {
                    exp: 0,
                    limit: 20,
                    game: 30,
                    pc: 0,
                    pasangan: '',
                    code: false,
                    registered: true,
                    name: m.name,
                    age: -1,
                    regTime: -1,
                    afk: -1,
                    afkReason: '',
                    banned: false,
                    warn: 0,
                    level: 0,
                    autolevelup: false,

                    money: 0,
                    healt: 100,
                    stamina: 100,
                    potion: 10,
                    sampah: 0,
                    kayu: 0,
                    batu: 0,
                    string: 0,
                    makananpet: 0,

                    emerald: 0,
                    diamond: 0,
                    gold: 0,
                    iron: 0,
                    
                   banteng: 0,
                   harimau: 0,
                   gajah: 0,
                   kambing: 0,
                   panda: 0,
                   buaya: 0,
                   kerbau : 0,
                   sapi: 0,
                   monyet : 0,
                   ikan: 0,
                   lele: 0,
                   ayam: 0,
                   
                  ayamb: 0,
                  ayamg: 0,
                  ssapi: 0,
                  sapir: 0,
                  leleb: 0,
                  leleg: 0,
                  ikang: 0,
                  ikanb: 0,

                    common: 0,
                    uncommon: 0,
                    mythic: 0,
                    legendary: 0,
                    pet: 0,

                    kuda: 0,
                    kudaexp: 0,
                    kucing: 0,
                    kucingexp: 0,
                    rubah: 0,
                    rubahexp: 0,
                    anjing: 0,
                    anjingexp: 0,

                    kudalastfeed: 0,
                    kucinglastfeed: 0,
                    rubahlastfeed: 0,
                    anjinglastfeed: 0,

                    armor: 0,
                    armordurability: 0,
                    sword: 0,
                    sworddurability: 0,
                    pickaxe: 0,
                    pickaxedurability: 0,
                    fishingrod: 0,
                    fishingroddurability: 0,

                    lastclaim: 0,
                    lastbansos: 0,
                    lastlabirin: 0,
                    lastdaily: 0,
                    lastexp: 0,
                    lastadventure: 0,
                    lastfishing: 0,
                    lastdungeon: 0,
                    lastduel: 0,
                    lastmining: 0,
                    lasthunt: 0,
                    lastweekly: 0,
                    lastmonthly: 0,
                    warning: 0,
                }
                let chat = global.db.data.chats[m.chat]
                if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
                if (chat) {
                    if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = false
                    if (!('sWelcome' in chat)) chat.sWelcome = ''
                    if (!('sBye' in chat)) chat.sBye = ''
                    if (!('sPromote' in chat)) chat.sPromote = ''
                    if (!('sDemote' in chat)) chat.sDemote = ''
                    if (!('delete' in chat)) chat.delete = false
                    if (!('expired' in chat)) chat.expired = 0
                    if (!('antiLink' in chat)) chat.antiLink = false
                    if (!('viewonce' in chat)) chat.viewonce = false
                    if (!('simi' in chat)) chat.simi = false
                    if (!('stiker' in chat)) chat.stiker = false
                    if (!('antiToxic' in chat)) chat.antiToxic = false
                } else global.db.data.chats[m.chat] = {
                    isBanned: false,
                    welcome: false,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    delete: false,
                    expired: 0,
                    antiLink: false,
                    viewonce: false,
                    simi: false,
                    stiker: false,
                    antiToxic: true,
                }
                
        let settings = global.db.data.settings
        if (typeof settings !== 'object') global.db.data.settings = {}
        if (settings) {
          if (!'anon' in settings) settings.anon = false
          if (!'antispam' in settings) settings.antispam = true
          if (!'groupOnly' in settings) settings.groupOnly = false
          if (!'nsfw' in settings) settings.nsfw = false
          if (!'self' in settings) settings.self = false
          if (!'queque' in settings) settings.queque = false
          if (!'auto' in settings) settings.auto = false
          if (!'autoread' in settings) settings.autoread = false
        } else global.db.data.settings = {
          anon: false,
          antispam: true,
          groupOnly: false,
          nsfw: false,
          self: false,
          queque: false,
          auto: false,
          autoread: false,
        }                
            } catch (e) {
                console.error(e)
            }
            let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            if (!isROwner && global.db.data.settings.self) return
            if (global.db.data.settings.groupOnly && !m.chat.endsWith('g.us')) return
            if (typeof m.text !== 'string') m.text = ''
            if (global.db.data.settings.queque && m.text) {
                this.msgqueque.push(m.id || m.key.id)
                await delay(this.msgqueque.length * 1000)
            }
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!plugin.all) continue
                if (typeof plugin.all !== 'function') continue
                try {
                    await plugin.all.call(this, m, chatUpdate)
                } catch (e) {
                    if (typeof e === 'string') continue
                    console.error(e)
                }
            }
            if (m.isBaileys) return
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
          
            let isOwner = isROwner || m.fromMe
            let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : {}
            let participants = (m.isGroup ? groupMetadata.participants : []) || []
            let user = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : {} // User Data
            let bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
            let isAdmin = m.isGroup ? user.includes(m.sender) : false // Is User Admin?
            let isBotAdmin = m.isGroup ? user.includes(this.user.jid) : false // Are you Admin?
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
                let match = (_prefix instanceof RegExp ? // RegExp Mode?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ? // Array?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ? // RegExp in Array?
                                p :
                                new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                        typeof _prefix === 'string' ? // String?
                            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                            [[[], new RegExp]]
                ).find(p => p[1])
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || global.dfail // When failed
                    let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                        plugin.command.test(command) :
                        Array.isArray(plugin.command) ? // Array?
                            plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                                cmd.test(command) :
                                cmd === command
                            ) :
                            typeof plugin.command === 'string' ? // String?
                                plugin.command === command :
                                false

                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                        let chat = global.db.data.chats[m.chat]
                        let user = global.db.data.users[m.sender]
                        if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
                        if (name != 'unbanchat.js' && user && user.banned) return
                    }
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    if (plugin.owner && !isOwner) { // Number Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !(isAdmin || isOwner)) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                        fail('unreg', m, this)
                        continue
                    }
                    if (plugin.nsfw && !global.db.data.settings.nsfw) {
                       fail('nsfw', m, this)
                       continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 20 // XP Earning per command
                    if (xp > 200) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.sendButton(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}shop buy limit*\nAtau Jadilah Premium Untuk Unlimited *Limit*\nMau premium? ketik *${usedPrefix}price* Untuk melihat harga`, wm, 'Buy Limit', '.shop buy limit 1', m)
                        continue // Limit habis
                    }
                    if (!isPrems && plugin.game && global.db.data.users[m.sender].game < plugin.game * 1) {
                        this.sendButton(m.chat, `Limit Game anda habis\n\nNote: Limit Game Direset setiap jam 00:00\nMau premium? ketik *${usedPrefix}price* Untuk melihat harga`, wm, 'Owner', '.owner', m)
                        continue // Limit game habis
                    }
                    if (plugin.level > _user.level) {
                        this.sendButton(m.chat, `diperlukan level ${plugin.level} untuk menggunakan Fitur ini.\nLevel kamu: ${_user.level}`, wm, 'Naikan Level', '.levelup', m)
                        continue // If the level has not been reached
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                    }
                    try {
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                        if (!isPrems) m.game = m.game || plugin.game || false
                        
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(global.APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            m.reply(text)
                        }
                    } finally {
                        // m.reply(util.format(_user))
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        //if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
                        //if (m.game) m.reply(+ m.game + ' Limit game terpakai')
                    }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            //console.log(global.db.data.users[m.sender])
            let user, stats = global.db.data.stats
            if (m) {
                if (m.sender && (user = global.db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                    user.game -= m.game * 1
                }

                let stat
                if (m.plugin) {
                    let now = + new Date
                    if (m.plugin in stats) {
                        stat = stats[m.plugin]
                        if (!isNumber(stat.total)) stat.total = 1
                        if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                        if (!isNumber(stat.last)) stat.last = now
                        if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                    } else stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                    stat.total += 1
                    stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }

            // try {
            //     require('./lib/print')(m, this)
            // } catch (e) {
            //     console.log(m, m.quoted, e)
            // }
            if (global.db.data.settings.autoread) await this.sendReadReceipt(m.chat, m.sender, [m.id])
            let quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (global.db.data.settings.queque && m.text && quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
        }
    },
    async participantsUpdate({ id, participants, action }) {
        if (global.db.data.settings.self) return
        // if (id in conn.chats) return // First login will spam
        if (global.isInit) return
        let chat = global.db.data.chats[id] || {}
        let text = ''
        switch (action) {
            case 'add':
            case 'remove':
                if (chat.welcome) {
                    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                    for (let user of participants) {
                        let pp = './src/avatar_contact.png'
                        try {
                            pp = await this.profilePictureUrl(user, 'image')
                        } catch (e) {
                        } finally {
                            text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', groupMetadata.subject).replace('@desc', groupMetadata.desc.toString()) :
                                (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                            this.sendFile(id, pp, 'pp.jpg', text, null, false, {
                                contextInfo: {
                                    mentionedJid: [user]
                                }
                            })
                        }
                    }
                }
                break
            case 'promote':
                text = (chat.sPromote || this.spromote || conn.spromote || '@user ```Sekarang adalah admin```')
            case 'demote':
                if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```Sekarang bukan admin```')
                text = text.replace('@user', '@' + participants[0].split('@')[0])
                if (chat.welcome) return this.reply(id, text, null, { mentions: [participants[0]] })
                break
        }
    },
    async delete({ remoteJid, fromMe, id, participant }) {
        if (fromMe) return
        let chats = Object.entries(conn.chats).find(([user, data]) => data.messages && data.messages[id])
        if (!chats) return
        let msg = JSON.parse(chats[1].messages[id])
        let buttons = [{buttonId: `.on delete`, buttonText: {displayText: 'Matikan Antidelete'}, type: 1}]
        let chat = global.db.data.chats[msg.key.remoteJid] || {}
        if (chat.delete) return
        await this.sendMessage(msg.key.remoteJid, { text: `
Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.on delete*
`.trim(), buttons: buttons, footer: `Antidelete Group`, headerType: 'TEXT', mentions: [participant] }, { quoted: msg })
        this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
    }
}

global.dfail = async(type, m, conn) => {
    let user = global.db.data.users[m.sender]
    let nme = await conn.getName(m.sender)
    let secs = [{ title: "Menu cepat bot", rows: [ { title: "All menu", rowId: "#menu", description: "Menampilkan Semua Menu Bot" }, { title: "Rules", rowId: "#rules", description: "Baca peraturan Bot Sebelum Memakai!" }, { title: "Pemilik Bot", rowId: "#owner", description: "Untuk bertanya/melaporkan segala tentang bot" } ] }]
    if (!user.registered) secs = [{ title: "Daftar Sebagai User bot", rows: [ { title: "Umur 10", rowId: `.daftar ${nme}.10` }, { title: "Umur 11", rowId: `.daftar ${nme}.11` }, { title: "Umur 12", rowId: `.daftar ${nme}.12` }, { title: "Umur 13", rowId: `.daftar ${nme}.13` }, { title: "Umur 14", rowId: `.daftar ${nme}.14` }, { title: "Umur 15", rowId: `.daftar ${nme}.15` }, { title: "Umur 16", rowId: `.daftar ${nme}.16` }, { title: "Umur 17", rowId: `.daftar ${nme}.17` }, { title: "Umur 18", rowId: `.daftar ${nme}.18` }, { title: "Umur 19", rowId: `.daftar ${nme}.19` }, { title: "Umur 20", rowId: `.daftar ${nme}.20` }, { title: "Umur 21", rowId: `.daftar ${nme}.21`, } ] }]
    let msg = {
        rowner: 'Perintah ini hanya dapat digunakan oleh _*OWWNER!1!1!*_',
        owner: 'Perintah ini hanya dapat digunakan oleh _*Owner Bot*_!',
        mods: 'Perintah ini hanya dapat digunakan oleh _*Moderator*_ !',
        premium: 'Perintah ini hanya untuk member _*Premium*_ !',
        group: 'Perintah ini hanya dapat digunakan di grup!',
        private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!',
        admin: 'Perintah ini hanya untuk *Admin* grup!',
        nsfw: 'Perintah ini Mengandung *18+* Harap hidupkan mode nsfw!',
        botAdmin: 'Jadikan bot sebagai *Admin* untuk menggunakan perintah ini!',
        unreg: `*「 BELUM TERDAFTAR 」*\n\nHalo ${nme}, Yuk Daftar Dulu Soalnya Anda Belum Terdaftar Di Database Bot Nih\n\nKetik : #daftar nama.umur\nContoh : #daftar ${nme}.15`,
        restrict: 'Fitur ini di *disable*!'
    }[type]
    if (msg) return conn.sendMessage(m.chat, { text: msg, footer: global.wm, title: "─────ꕥ WARNING ꕥ────", buttonText: user.registered ? 'Click Here' : 'Daftar Disini', sections: secs }, { quoted: m })
   }

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})