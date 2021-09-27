const mongoose = require('mongoose');
const stream = require("stream");
const Schema = mongoose.Schema;
const LeaderModel = new Schema({
    id: String,
    name: String,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        required: true,
        type: String
    }

});
