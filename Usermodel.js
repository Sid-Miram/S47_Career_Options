const mongoose = require('mongoose');

const Day = new mongoose.Schema({
    id: {
        type: Number,
        // required: true,
        // unique: true,
    },
    day: {
        type: String,
        // If it's required, you can set it to true
        // required: true,
    },
    title: {
        type: String,
        // required: true,
    },
    actions: {
        type: String,
        // required: true,
    },
    // Add other fields if needed
});

const DayModel = mongoose.model('List', Day);

module.exports = DayModel;


