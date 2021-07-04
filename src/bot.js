const { Client } = require('discord.js');
const axios = require("axios");

const client = new Client();
const prefix = '$';
client.on('ready', () => {
    console.log(`${client.user.tag} is here`);
    client.user.setPresence({
        activity: {
            name: `USE ${prefix}help FOR HELP`
        }
    });
});
client.on('message', (message) => {
    if (message.author.bot) {
        return;
    }
    console.log(`[${message.author.tag}] : ${message.content}`);

    if (message.content === 'hello') {
        message.reply(`Hello There!!`);
    }
});

client.on('message', async (message) => {
    if (message.content.startsWith(prefix)) {
        const [CMD_NAME, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
        console.log(CMD_NAME);
        console.log(args);
        if (CMD_NAME === "help") {
            message.channel.send("You have access to the following commands. \n`$get [1-3]` : **To get at most 3 quiz closest to the current Date.** \n`$get [QuizNameWithNoSpace]` : **Get Information for that Quiz.** \n`$post [QuizNameWithNoSpace] [DateIn (YYYY-MM-DD) Format]` : **Posting of a Quiz.** \n`$edit [CurrentQuizNameNoSpace] [NewQuizNameNoSpace] [NewDateIn (YYYY-MM-DD) Format]` : **To Edit a Quiz**  \n`$delete [QuizNameNoSpace]` : **To Delete a Quiz**\n\n **Note** : **Remove the Square Brackets while typing the commands!**");
        }
        if (CMD_NAME === "get") {
            if (args.length > 1) {
                message.channel.send("Too many Inputs , Check Spaces");
            }
            else if (args.length < 1) {
                message.channel.send("Too Few Arguments");
            }
            else {
                if (isNaN(args[0])) {
                    await axios.get(`${process.env.BASE_URL}/${args[0]}`)
                        .then(response => {
                            var targetDate, resultString = "", dash = "\n-----------------------------\n";
                            for (let i = 0; i < response.data.length; i++) {
                                resultString += (response.data[i].name);
                                resultString += ("\n");
                                targetDate = response.data[i].targetDate;
                                targetDate = targetDate.substr(0, targetDate.indexOf('T'));
                                resultString += (targetDate);
                                resultString += (dash);
                                console.log(resultString);
                            }
                            message.channel.send(resultString);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                else {
                    let no = parseInt(args[0]);
                    if (no > 3 || no < 1) {
                        message.channel.send("Enter Within Range");
                        return;
                    }
                    await axios.get(`${process.env.BASE_URL}/count/${args[0]}`)
                        .then(response => {
                            var targetDate, resultString = "", dash = "\n-----------------------------\n";
                            for (let i = 0; i < response.data.length; i++) {
                                resultString += (response.data[i].name);
                                resultString += ("\n");
                                targetDate = response.data[i].targetDate;
                                targetDate = targetDate.substr(0, targetDate.indexOf('T'));
                                resultString += (targetDate);
                                resultString += (dash);
                                console.log(resultString);
                            }
                            message.channel.send(resultString);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        }
        if (CMD_NAME === "post") {
            if (args.length < 2) {
                message.channel.send("Too Few Arguments");
            }
            else if (args.length > 2) {
                message.channel.send("Too Many Arguments , Check Spaces");
            }
            else {
                await axios.post(`${process.env.BASE_URL}/`, {
                    name: args[0],
                    targetDate: args[1]
                }).then(response => {
                    console.log(response.data);
                    message.channel.send(response.data);
                }).catch(err => {
                    console.log(err);
                    message.channel.send("Invalid Input");
                });
            }
        }
        if (CMD_NAME === "edit") {
            if (args.length < 3) {
                message.channel.send("Too Few Arguments");
            }
            else if (args.length > 3) {
                message.channel.send("Too Many Arguments , Check Spaces");
            }
            else {
                await axios.put(`${process.env.BASE_URL}/${args[0]}`, {
                    name: args[1],
                    targetDate: args[2]
                }).then(response => {
                    console.log(response.data);
                    message.channel.send(response.data);
                }).catch(err => {
                    console.log(err);
                    message.channel.send("Invalid Input");
                });
            }
        }
        if (CMD_NAME === "delete") {
            if (args.length < 1) {
                message.channel.send("Too Few Arguments");
            }
            else if (args.length > 1) {
                message.channel.send("Too Many Arguments , Check Spaces");
            }
            else {
                await axios.delete(`${process.env.BASE_URL}/${args[0]}`)
                    .then(response => {
                        console.log(response.data);
                        message.channel.send(response.data);
                    }).catch(err => {
                        console.log(err);
                        message.channel.send("Invalid Input");
                    });
            }
        }
    }
});


module.exports = client;