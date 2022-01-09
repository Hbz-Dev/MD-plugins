let axios = require('axios')
let handler = async (m, { conn }) => {
            let res = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            let { postlink, title, subreddit, url, nsfw, spoiler } = res.data
            conn.but(m.chat, `${title}`, 'Humor koo receh🗿\nMade By '+wm, m.sender, 'Get Again', '.meme', `${url}`, m)        
}
handler.help = ['meme']
handler.tags = ['fun']
handler.command = /^(meme)$/i
handler.limit = true

module.exports = handler
