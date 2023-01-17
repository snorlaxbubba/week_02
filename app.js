const express = require('express')
const database = require('./mysqlDatabase')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

const pokemon = require('./data/pokemon.json')
app.use(express.json())

app.get("/", async (req, res) => {
    const pokemonSql = await database.getPokemon()
    res.render('index.ejs', {pokemon:pokemon, pokemonSql})
})


app.post("/createPokemon", async (req, res) => {
    const {title, pokemon, numDefeated} = req.body

    console.log("sanity check")
    await database.addPokemon(title, pokemon, numDefeated)



    res.redirect('/')
})

app.post("/deletePokemon", async (req, res) => {
    const {id} = req.body

    await database.deletePokemon(id)

    res.redirect("/")
})


app.post("/:id", async (req, res) => {
    const {pokemonId} = req.body
    const pokemonIds = await database.getPokemonById(pokemonId)
    res.render('single.ejs', {pokemonIds: pokemonIds})
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))