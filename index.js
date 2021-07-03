const express = require("express");
const mongoose = require("mongoose");
const database = require("./config/db");
const dotenv = require("dotenv");
const client = require("./src/bot");

dotenv.config({ path: "./config/config.env" });

database();
client.login(process.env.DISCORDJS_BOT_TOKEN);
const app = express();

app.use("/", require("./routes/route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
