let handler = m => m

handler.before = async (m) => {
    let chat = db.data.chats[m.chat]
    let seting = db.data.settings
    if (chat.simi && !chat.isBanned && !m.isCommand) {
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let res = await fetchJson(`https://api.simsimi.net/v2/?text=${m.text}&lc=id`)
        if (res.success == 'Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku.') return m.reply('Kata² yang bagus Tetapi simi tidak memahaminya..')
        m.reply(res.success)
        return !0
    }
    return !0
}

module.exports = handler

const axios = require('axios')
async function fetchJson(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}