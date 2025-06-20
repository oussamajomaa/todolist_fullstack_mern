const express = require('express')
const Task = require('../models/Task')
const verifyToken = require('../util/verifyToken')
const { verify } = require('jsonwebtoken')

const router = express.Router()

// Récupérer toutes les tâches de l'utilisateur connecté
router.get('/task', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id })
        res.status(200).json(tasks)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' })
    }
})

// Créer une tâche
router.post('/task', verifyToken, async (req, res) => {
    try {
        // const {title} = req.body
        const title = req.body.title
        if (!title || title.trim().length === 0) {
            return res.status(400).json({ message: "Ce champ est requis" })
        }
        const task = { title, userId: req.user.id }
        await Task.create(task)
        res.status(201).json({ message: "Une tâche a été ajoutée" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' })
    }
})

router.delete('/task/:id', verifyToken, async(req,res) =>{
    // const { id } = req.params
    const id = req.params.id
    try {
        await Task.findByIdAndDelete(id)
        res.status(200).json({message:"La tâche a été supprimée!"})
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: "Erreur lors de la suppression d'une tâche." })
    }
})

router.put('/task/:id', verifyToken, async(req,res)=> {
    const {id} = req.params
    const task = req.body
    await Task.findByIdAndUpdate(id, task)
    res.status(200).json({message:"La tâche modifée"})
})


module.exports = router