const mongoose = require('mongoose');

// Définition du schéma de tâche
const taskSchema = new mongoose.Schema({
    // Titre de la tâche, obligatoire
    title: {
        type: String,
        required: true
    },

    // Statut de la tâche : terminée ou non (par défaut : non terminée)
    status: {
        type: Boolean,
        default: false
    },

    // Référence à l'utilisateur qui a créé la tâche
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Type ObjectId MongoDB
        ref: 'User' // Référence au modèle 'User'
    }
});

// Création du modèle Task à partir du schéma
const Task = mongoose.model('Task', taskSchema);

// Export du modèle
module.exports = Task;
