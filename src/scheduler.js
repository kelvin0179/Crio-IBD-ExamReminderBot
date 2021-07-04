const axios = require("axios");
const cron = require("node-cron");
const quiz = require("../models/quiz");

module.exports = (client) => {
    var channel;
    client.on('ready', () => {
        channel = client.channels.cache.find(iterator => iterator.name === "general");
    });
    var reminderString = "0 7 */1 * *", deleteString = "0 0 */1 * *";
    cron.schedule(deleteString, async (req, res) => {
        console.log("Job Active");
        await axios.delete(`${process.env.BASE_URL}/date/currentDate`)
            .then(response => {
                channel.send(response.data);
            })
            .catch(err => {
                console.log(error);
            })
    });
}
