let handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} Pou`
    let res = await hwhw(text)
    if (!res.result.length) throw 'Aplikasi tidak ditemukan ツ'
    let teks = '[ *HAPPYMOD SEARCH* ]\n\n'
    teks += res.result.map((v) => `*Title:* ${v.title}\n*Link:* ${v.link}\n`).join`\n\n`
    //conn.sendFile(m.chat, res.result.thumb, 'hppy.jpg', teks, m)
    m.reply(teks)
}
handler.help = ['happymod <pencarian>']
handler.tags = ['internet']
handler.limit = 1

handler.command = /^happymod|hppymod/i
handler.register = false
module.exports = handler

const cheerio = require("cheerio");
const axios = require("axios")

async function hwhw(q) {
host = "https://happymod.com";
html = (await axios.get(`${host}/search.html?q=${q}`)).data;
let $ = cheerio.load(html)
tez = $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div.pdt-app-box')

if(!tez.toString()) throw { result: [] };
res = []

tez.each(function (g, o) {
link = host+$(o).find('a').attr("href")
title = $(o).find('a').attr("title");
thumb = $(o).find('img').attr('data-original');
res.push({ title, link, thumb})
})

return { result: res }
}