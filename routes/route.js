const express = require("express");
const mongoose = require("mongoose");
const quiz = require("../models/quiz");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let response = await quiz.find({}).sort({ targetDate: -1 }).limit(3).lean();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("No Records");
    }
});

router.post("/", async (req, res) => {
    try {
        let saveData = new quiz({
            name: req.body.name,
            targetDate: req.body.targetDate
        });
        await saveData.save();
        res.send("Record Saved");
    } catch (error) {
        console.log(error);
        res.send("Invalid Data");
    }
});

module.exports = router;