const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
// const nodemailer = require('nodemailer')
// const transporter = require('../util/transporter')
// const mail = require('../util/mail')

router.post('/register', async (req, res) => {
    // const username = req.body.username
    const { username, email, password } = req.body
    const existinguser = await User.findOne({ email })
    if (existinguser) {
        return res.status(400).json({ message: "Bad request" })
    }
    const hash = await bcrypt.hash(password, 10)
    await User.create({ username, email, password: hash })
    


    // const activationToken = jwt.sign(
    //     { email },
    //     process.env.JWT_SECRET,
    //     { expiresIn: '1d' } // token valable 1 jour
    // );
    // const activationLink = `http://localhost:5000/activate/${activationToken}`;
    // await mail(email,username,activationLink)

    res.status(201).json({ message: "Un utilisateur a été ajouté" })
})

router.post('/login', async(req,res)=> {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return res.status(404).json({message:"Identifiants invalides"})
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(404).json({message:"Identifiants invalides"})
    }
    const token = jwt.sign(
        {id:user._id, email:user.email, role:user.role},
        process.env.JWT_SECRET
    )
    res.status(200).json({
        email:email,
        role:user.role,
        token:token
    })
})
























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