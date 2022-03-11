let handler = async (m, { conn, usedPrefix, groupMetadata, command }) => {
  try {
            let chat = global.db.data.chats[m.chat].welcome
            let ppGroup;
            try {
                ppGroup = await conn.profilePictureUrl(m.chat, "image");
            } catch { ppGroup = 'https://tinyurl.com/yeon6okd' }

            let text = `\`\`\`\nSubject: ${groupMetadata?.subject}\nOwner: ${groupMetadata?.owner}\nID: ${groupMetadata?.id}\nSize: ${groupMetadata?.participants?.length}\n`
            text += `Created: ${new Date(groupMetadata?.creation * 1000).toLocaleString()} \nWelcome: ${chat ? "ON" : "OFF"}\nPromote: ${chat ? "ON" : "OFF"}\n`
            text += `Desc:\n${groupMetadata?.desc ? groupMetadata?.desc?.toString() : 'Empty'}\`\`\``

            await conn.sendMessage(m.chat, { image: { url: ppGroup }, caption: text }, { quoted: m });
        } catch {
            await m.reply("Terjadi kesalahan\nHarap coba lagi nanti");
        }
}
handler.help = ['groupinfo']
handler.tags = ['group']
handler.command = /^(groupinfo|gcinfo|infogc|infogroup)$/i

module.exports = handler
