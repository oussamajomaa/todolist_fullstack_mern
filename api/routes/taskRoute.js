const express = require('express')
const Task = require('../models/Task')
const verifyToken = require('../util/verifyToken')

const router = express.Router()




router.get('/task',verifyToken, async(req,res) => {
    const tasks = await Task.find({userId:req.user.id})
    res.json(tasks)
})

module.exports = router