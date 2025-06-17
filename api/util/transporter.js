require('dotenv').config()
const nodemailer = require('nodemailer')

// crée un canal de communication SMTP pour envoyer des emails.
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
    }
})

module.exports = transporter