const express = require('express');
const Task = require('../models/Task');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Route : GET /task
// Description : Récupérer toutes les tâches associées à l'utilisateur connecté
router.get('/task', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    }
});

// Route : POST /task
// Description : Créer une nouvelle tâche pour l'utilisateur connecté
router.post('/task', verifyToken, async (req, res) => {
    try {
        const title = req.body.title;

        // Validation simple du champ "title"
        if (!title || title.trim().length === 0) {
            return res.status(400).json({ message: "Ce champ est requis" });
        }

        // Création de la tâche avec l'ID de l'utilisateur
        const task = { title, userId: req.user.id };
        await Task.create(task);

        res.status(201).json({ message: "Une tâche a été ajoutée" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la création de la tâche." });
    }
});

// Route : DELETE /task/:id
// Description : Supprimer une tâche spécifique
router.delete('/task/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "La tâche a été supprimée !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la suppression d'une tâche." });
    }
});

// Route : PUT /task/:id
// Description : Mettre à jour une tâche existante
router.put('/task/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const task = req.body;

    try {
        // Met à jour la tâche sans renvoyer la version modifiée
        await Task.findByIdAndUpdate(id, task);

        res.status(200).json({ message: "La tâche modifiée" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la modification de la tâche." });
    }
});

module.exports = router;
