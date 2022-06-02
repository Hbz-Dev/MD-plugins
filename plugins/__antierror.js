let handler = m => m

handler.all = async function (m) {
    let user = global.db.data.users[m.sender]
    if ((user.stamina * 1) > 200) {
        user.stamina = 200
    } else if ((user.stamina * 1) < 0) {
        user.stamina = 0
    }
    if ((user.armordurability * 1) < 0) {
        user.armor -= 1
        user.armordurability = 0
    }
    if ((user.sworddurability * 1) < 0) {
        user.sword -= 1
        user.sworddurability = 100
    }
    if ((user.healt * 1) > 100) {
        user.healt = 100
    } else if ((user.healt * 1) < 0) {
        user.healt = 0
    }
}

module.exports = handler
