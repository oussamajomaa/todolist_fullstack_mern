const jwt = require('jsonwebtoken')

async function verifyToken (req,res,next) {
    const token = req.headers.authorization?.split(' ')[1]
    console.log(token)
    if (!token) {
        return res.status(401).json({message:'Non autorisé'})
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
}

module.exports = verifyToken