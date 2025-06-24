const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Chargement des variables d'environnement
const cors = require('cors');
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const adminRoute = require('./routes/adminRoute')

const app = express();
app.use(cookieParser())

// Middlewares globaux
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(express.json()); // Parse automatiquement les requêtes JSON

// Utilisation des routes
app.use('', userRoute); // Routes pour /register, /login, etc.
app.use('', taskRoute); // Routes pour /task, /task/:id, etc.
app.use('', adminRoute); // Routes pour /admin.

// Définition du port
const PORT = process.env.PORT || 5000;

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connexion réussie à MongoDB");
        // Démarrage du serveur après connexion réussie
        app.listen(PORT, () => console.log('Le serveur tourne sur le port ' + PORT));
    })
    .catch(e => console.log("Erreur de connexion à MongoDB :", e));
