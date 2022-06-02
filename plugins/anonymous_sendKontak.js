let { Presence } = require('@adiwajshing/baileys')
async function handler(m, { command, usedPrefix, text }) {
	//await this.sendPresenceUpdate('composing', m.chat)
	this.anonymous = this.anonymous ? this.anonymous : {}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let room = Object.values(this.anonymous).find(room => room.check(who))
	if (!room) return this.sendButton(m.chat, 'kamu tidak berada di anonymous chat!', ' ', 'Mulai Anonymous', usedPrefix + 'start', m)
	let other = room.other(who)
	var name
	if (text) name = text
	else name = this.getName(m.sender)
	var number = who.split('@')[0]
	if (other) this.reply(other, 'Partner mengirimkan kontaknya kepadamu', null)
	if (other) this.sendContact(other, number, name, null)
}
handler.help = ['sendkontak']
handler.tags = 'anonymous'
handler.command = /^(sendkontak|kirimkontak)$/i
handler.private = true

module.exports = handler
