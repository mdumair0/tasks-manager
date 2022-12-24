const mongoose = require('mongoose')

const task = mongoose.model('tasks',{
    task:{
        type: String,
        required: true,
        trim: true
    },
    done:{
        type: Boolean,
        required: true
    }
})

module.exports = task