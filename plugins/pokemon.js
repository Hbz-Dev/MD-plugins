let fetch = require("node-fetch")

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Pokemonnya mana?`
  let json = await (await fetch(`https://some-random-api.ml/pokedex?pokemon=${text}`)).json()
  let pokedex = `
Name: ${json.name}
Id: ${json.id}
Type: ${json.type}
Species: ${json.species}
Abilites: ${json.abilities}
Height: ${json.height}
Weight: ${json.weight}
Base experience: ${json.base_experience}
Gender: ${json.gender}
Egg groups: ${json.egg_groups}\n
STATS
Hp: ${json.stats.hp}
Attack: ${json.stats.attack}
Defense: ${json.stats.defense}
Sp atk: ${json.stats.sp_atk}
Sp def: ${json.stats.sp_def}
Speed: ${json.stats.speed}
Total: ${json.stats.total}\n
FAMILY
Evolution Stage: ${json.family.evolutionStage}
Evolution Line: ${json.family.evolutionLine}\n
DESCRIPTION
${json.description}
Generation: ${json.generation}
  `.trim()
  
      conn.sendFile(
      m.chat,
      json.sprites.normal,
      "pokemon.png",
      pokedex,
      m
    )
}
handler.help = ["pokemon", "catch"].map((v) => v + " <pokemon>")
handler.tags = ["internet"]
handler.command = /^(pokemon|pokedex|catch|c)$/i

module.exports = handler