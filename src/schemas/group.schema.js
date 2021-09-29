const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    id: String,
    name: {type: String, required: true},
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupMember",
        index: true,
        required: true
    },
    groupMembers: Array
});

module.exports = mongoose.model('Group', GroupSchema);
