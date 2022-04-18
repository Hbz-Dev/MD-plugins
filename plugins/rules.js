let handler = async (m, { conn }) => await conn.sendButton(m.chat, `
*── 「 RULES AND FAQ 」 ──*
${readMore}
1. Jangan spam bot. 🙅
Sanksi: *❎ WARN/SOFT BLOCK*

2. Jangan telepon bot. ☎️
Sanksi: *❎ SOFT BLOCK*

3. Jangan mengeksploitasi bot.😖
Sanksi: *PERMANENT BLOCK*

🗯️ Bot tidak atau lambat merespon ?
➡️ Mungkin dipengaruhi oleh jaringan, signal, banned oleh Whatsapp dan beberapa alasan lain. Tetap patuhi rules‼️

🗯️ Dimana saya bisa mendapatkan Script dari bot ini ?
➡️ Script ini masih private dan tidak pernah diperjual belikan ,bijaklah dalam mengetahui penipu.

🗯️ Boleh saya menambah ke grup?
➡️ Tidak boleh Sembarangan! harap chat owner terlebih dahulu

🗯️ Prefixnya apa ya?
➡️ Bot ini menggunakan multi prefix. Berarti anda bisa menggunakan prefix #, . , Dan prefix wajar lainnya.

🗯️ Kak, kok syaa chat owner tidak direspon?
➡️ Owner hanya merespon pertanyaan seputar bot Dan kendala eror, tidak untuk kenalan ataupun mengemis script.


Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!

⚠️ Segala kebijakan dan ketentuan bot ini di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, memblokir user(*﹏*) 

Arigatou Gozaimasu! Untuk kalian user ramah!
😖🙏
${wm}
`.trim(), 'Harap patuhin peraturan tersebut', 'Owner', '.owner', m)

handler.help = ['rules']
handler.tags = ['info']

handler.command = /^(rules|peraturan)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)