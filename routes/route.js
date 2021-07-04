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

router.get("/api/record/alert", async (req, res) => {
    try {
        let newDate = new Date(Date.now());
        let response = await quiz.aggregate(
            [
                {
                    $addFields: {
                        daysAway: { $divide: [{ $subtract: ["$targetDate", newDate] }, 86400000] } // 1 day == 8.64 * 1e7 ms
                    }
                },
                {
                    $match: { daysAway: { $lte: 2 } }
                }
            ]
        );
        console.log(response);
        if (response.length > 0)
            res.send(response);
    } catch (error) {
        console.log(error);
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
        if (error.code === 11000)
            res.send("Name Already Exists");
        else
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
        let arr = await quiz.deleteOne({ name: req.params.name });
        console.log(arr);
        if (arr.deletedCount == 0)
            res.send("No Record to Delete");
        else
            res.send("Record Deleted");
    } catch (error) {
        console.log(error);
        res.send("This record dose not exits");
    }
});

router.delete("/date/currentDate", async (req, res) => {
    try {
        let newDate = new Date(Date.now());
        let arr = await quiz.deleteMany({ targetDate: { $lte: newDate } });
        console.log(arr);
        let deletedNumber = parseInt(arr.deletedCount);
        console.log(deletedNumber);
        if (deletedNumber > 0)
            res.send(`${arr.deletedCount} exams are over today!`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;