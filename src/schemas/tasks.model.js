const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksModel = new Schema({
    title:{
        type: String
    },
    description: String,
    location: String,
    isCompleted: Boolean,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
})

module.exports = mongoose.model('tasks',TasksModel);