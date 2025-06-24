const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const nodemailer = require('nodemailer')

// Route d'inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis' })
    }
    // Vérifie si l'utilisateur existe déjà
    const existinguser = await User.findOne({ email })
    if (existinguser) {
        return res.status(400).json({ message: "Bad request" }) // Email déjà utilisé
    }

    // Hash du mot de passe avant sauvegarde
    const hash = await bcrypt.hash(password, 10)

    // Création du nouvel utilisateur
    await User.create({ username, email, password: hash })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS
        }
    })

    const token = jwt.sign(
        {
            email: email,
        },
        process.env.JWT_SECRET, // Clé secrète définie dans le fichier .env

    )


    const activationLink = `http://localhost:5000/validate/${token}`
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Active ton compte",
        html: `<p>Bonjour ${username},</p>
                <p>Merci de t’être inscrit. Clique ici pour activer ton compte :</p>
                <a href="${activationLink}">${activationLink}</a>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err)
        console.log('email envoyé ', info)
    })
    // Réponse de succès
    res.status(201).json({ message: "Vérifier votre email pour valider votre compte." })
})

router.get('/validate/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        }

        user.isVerified = true
        await user.save()

        res.status(200).redirect('http://localhost:5173/activated-account')
    } catch {
        res.status(400).json({ message: "Lien invalide ou expiré." })
    }
})

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "Identifiants invalides" })
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(404).json({ message: "Identifiants invalides" })
    }

    if (!user.isVerified) {
        return res.status(403).json({ message: 'Compte non activé!' })
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
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 2 * 60 * 60 * 1000 // 2h
    })

    res.status(200).json({ role:user.role,username:user.username,email:user.email })

    // Envoi des infos utiles au client
    // res.status(200).json({
    //     email: user.email,
    //     role: user.role,
    //     username: user.username,
    //     token: token
    // })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
  })

  res.status(200).json({ message: 'Déconnecté avec succès' })
})


module.exports = router