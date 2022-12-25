const mongoose = require('mongoose')

const Task = mongoose.model('Task',{
    task:{
        type: String,
        required: true,
        trim: true
    },
    done:{
        type: Boolean,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Task