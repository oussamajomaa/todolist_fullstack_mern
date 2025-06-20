const mongoose = require('mongoose');

// Définition du schéma de l'utilisateur
const userSchema = mongoose.Schema({
    // Nom d'utilisateur requis
    username: {
        type: String,
        required: true
    },

    // Email requis et unique
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Mot de passe requis (hashé côté backend)
    password: {
        type: String,
        required: true
    },

    // Rôle de l'utilisateur (par défaut : "user", peut aussi être "admin")
    role: {
        type: String,
        default: 'user'
    },

    // Statut de vérification (par exemple pour l'activation par email)
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Ajoute automatiquement createdAt et updatedAt

// Création du modèle User à partir du schéma
const User = mongoose.model('User', userSchema);

// Export du modèle
module.exports = User;

// Alternative équivalente à la ligne précédente :
// module.exports = mongoose.model('User', userSchema);
