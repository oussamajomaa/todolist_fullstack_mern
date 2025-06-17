const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    }, 
    status:{
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Task = mongoose.model('Task', taskSchema)
module.exports = Task