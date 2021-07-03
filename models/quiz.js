const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    targetDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("quiz", quizSchema);