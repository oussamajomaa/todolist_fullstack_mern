const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const userRoute = require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')

const app = express()

// Middlewre
app.use(cors())
app.use(express.json()) // permet de lire les données json envoyées
app.use('',userRoute)
app.use('',taskRoute)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Connexion réussi à MongoDB")
    app.listen(PORT, ()=> console.log('Le serveur tourne sur le port '+ PORT))
})
.catch(e => console.log(e))