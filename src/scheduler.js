const axios = require("axios");
const cron = require("node-cron");
const quiz = require("../models/quiz");

module.exports = (client) => {
    var channel;
    client.on('ready', () => {
        channel = client.channels.cache.find(iterator => iterator.name === "general");
    });
    var reminderString = "0 7 */1 * *", deleteString = "0 0 */1 * *";
    // var reminderString = "*/10 * * * * *", deleteString = "*/15 * * * * *";
    cron.schedule(deleteString, async (req, res) => {
        console.log("Deletion Job Active");
        await axios.delete(`${process.env.BASE_URL}/date/currentDate`)
            .then(response => {
                channel.send(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    });
    cron.schedule(reminderString, async (req, res) => {
        console.log("Reminder Job Active");
        await axios.get(`${process.env.BASE_URL}/api/record/alert`)
            .then(response => {
                let localString = "**Alert**\n\n"
                for (let i = 0; i < response.data.length; i++) {
                    let f = parseFloat(response.data[i].daysAway);
                    f = Math.ceil(f);
                    localString += (`${response.data[i].name} is ${f} days away\n`);
                }
                channel.send(localString);
            })
            .catch(err => {
                console.log(err);
            })
    });
}
