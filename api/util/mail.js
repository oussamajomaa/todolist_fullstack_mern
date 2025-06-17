const transporter = require('./transporter')

// Envoyer l’email avec le lien
const mail = async(email, username, activationLink) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Active ton compte",
        html: `<p>Bonjour ${username},</p>
             <p>Merci de t’être inscrit. Clique ici pour activer ton compte :</p>
             <a href="${activationLink}">${activationLink}</a>`
    })
}

module.exports = mail