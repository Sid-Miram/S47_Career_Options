const mongoose = require('mongoose');

const Day = new mongoose.Schema({
    id: {
        type: Number,
        // required: true,
        unique: true,
    },
    day: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        required: true,
    },
    actions: {
        type: String,
        required: true,
    },
});

const DayModel = mongoose.model('List', Day);

module.exports = DayModel;


