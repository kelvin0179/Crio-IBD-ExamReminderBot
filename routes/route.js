const express = require("express");
const mongoose = require("mongoose");
const quiz = require("../models/quiz");

const router = express.Router();

router.get("/count/:number", async (req, res) => {
    try {
        let number = parseInt(req.params.number);
        let response = await quiz.find({}).sort({ targetDate: 1 }).limit(number).lean();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("No Records");
    }
});

router.get("/:name", async (req, res) => {
    try {
        let response = await quiz.find({ name: req.params.name }).lean();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send("No Records");
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
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

router.put("/:name", async (req, res) => {
    try {
        await quiz.findOneAndUpdate({ name: req.params.name }, req.body, {
            new: true,
            runValidators: true
        });
        res.send("Record Updated");
    } catch (error) {
        console.log(error);
        res.send("This record dose not exits");
    }
});

router.delete("/:name", async (req, res) => {
    try {
        await quiz.deleteOne({ name: req.params.name });
        res.send("Record Deleted");
    } catch (error) {
        console.log(error);
        res.send("This record dose not exits");
    }
});

module.exports = router;