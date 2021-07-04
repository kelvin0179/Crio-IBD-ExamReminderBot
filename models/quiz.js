const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    targetDate: {
        type: Date,
        required: true,
        min: Date.now,
        max: '2030-01-01'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("quiz", quizSchema);