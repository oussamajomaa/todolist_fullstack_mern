const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route d'inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existinguser = await User.findOne({ email });
    if (existinguser) {
        return res.status(400).json({ message: "Bad request" }); // Email déjà utilisé
    }

    // Hash du mot de passe avant sauvegarde
    const hash = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    await User.create({ username, email, password: hash });

    // Réponse de succès
    res.status(201).json({ message: "Un utilisateur a été ajouté" });
});

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "Identifiants invalides" });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).json({ message: "Identifiants invalides" });
    }

    // Génération du token JWT
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            username: user.username
        },
        process.env.JWT_SECRET // Clé secrète définie dans le fichier .env
    );

    // Envoi des infos utiles au client
    res.status(200).json({
        email: user.email,
        role: user.role,
        username: user.username,
        token: token
    });
});


























router.get('/activate/:token', async (req, res) => {
    try {
        // Récupération du token JWT depuis l'URL
        const token = req.params.token
        // décode et valide la signature avec la clé JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: decoded.email })

        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" })
        // On met à jour la propriété isVerified de l’utilisateur → activation du compte 
        user.isVerified = true;
        // Puis on sauvegarde ce changement dans MongoDB.
        await user.save();
        // On redirige l’utilisateur vers une page React : /account-activated
        res.status(200).redirect('http://localhost:5173/account-activated')
    } catch {
        res.status(400).json({message:"Lien invalide ou expiré."})
    }
})

module.exports = router