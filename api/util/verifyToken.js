const jwt = require('jsonwebtoken')

async function verifyToken (req,res,next) {
    const authHeaders = req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(400).json({message:"Accès non autorisé"})
    }
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({message:"Token non valide"})
    }
}

module.exports = verifyToken