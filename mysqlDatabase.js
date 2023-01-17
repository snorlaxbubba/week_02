const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()


const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
  })
    .promise()

async function getPokemon() {
    const query = `
    SELECT *
    FROM pokemon
    `

    const [rows] = await pool.query(query)
    return rows
}
exports.getPokemon = getPokemon

async function getPokemonById(id) {
  const query = `
  SELECT *
  FROM pokemon 
  WHERE id = ?
  `
  const [rows] = await pool.query(query, [id])
  return rows[0]

}
exports.getPokemonById = getPokemonById

async function addPokemon(title, pokemon, numDefeated) {
    const query = `
    INSERT INTO pokemon (title, pokemon, numDefeated)
    VALUES (?, ?, ?)
    `

    await pool.query(query, [title, pokemon, numDefeated])
}
exports.addPokemon = addPokemon

async function deletePokemon(id) {
    const query =`
    DELETE FROM pokemon
    WHERE id = ?
    `

    await pool.query(query, [id])
}
exports.deletePokemon = deletePokemon