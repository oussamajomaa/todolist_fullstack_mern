const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT dans les requêtes protégées
async function verifyToken(req, res, next) {
    // Récupère les en-têtes d'autorisation
    // const authHeaders = req.headers.authorization

    // // Vérifie que l'en-tête est présent et commence par "Bearer"
    // if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    //     return res.status(400).json({ message: "Accès non autorisé" });
    // }

    // // Récupère le token à partir de l'en-tête
    // const token = authHeaders.split(' ')[1];

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({message:'token manquant'})
    }


    try {
        // Vérifie et décode le token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajoute les infos utilisateur décodées à l'objet request
        req.user = decoded;

        // Passe au middleware suivant ou au contrôleur
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Token non valide" });
    }
}

module.exports = verifyToken;


// const activationToken = jwt.sign(
//     { email },
//     process.env.JWT_SECRET,
//     { expiresIn: '1d' } // token valable 1 jour
// );
// const activationLink = `http://localhost:5000/activate/${activationToken}`;
// await mail(email,username,activationLink)


