require('dotenv').config(); // Loads all env variables inside .env file

const { Client } = require('discord.js');
const client = new Client();
const prefix = '$';
client.on('ready', () => {
    console.log(`${client.user.tag} is here`);
});
client.on('message', (message) => {
    if (message.author.bot) { // if the bot send the same msg then this prevents INFILOOP
        return;
    }
    console.log(`[${message.author.tag}] : ${message.content}`);
    if (message.content === 'hello') {
        message.reply(`Hello There!!`);
        // message.channel.send("hello");
    }
});
client.on('message', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content.startsWith(prefix)) {
        const [CMD_NAME, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
        if (CMD_NAME === "kick") {
            if (!message.member.hasPermission("KICK_MEMBERS")) {
                return message.channel.send("You Do not have Permissions");
            }
            if (args.length === 0) {
                return message.reply("Please Enter an ID");
            }
            else {
                const member = message.guild.members.cache.get(args[0]);
                if (member) {
                    member.kick()
                        .then((member) => {
                            message.channel.send(`${member} was Kicked`)
                        })
                        .catch((err) => {
                            message.channel.send("Do not have Permission")
                        });
                }
                else {
                    message.channel.send("The member was not found");
                }
            }
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);