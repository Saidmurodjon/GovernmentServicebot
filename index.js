const TelegramBot = require("node-telegram-bot-api");
// const axois =require('axios')
const mongoose = require("mongoose");

const Controllers = require("./controllers.js");
const { TOKEN, MONGODB, OPTIONS } = require("./config.js");

const connectionParams = {
  useNewUrlParser: true,

  useUnifiedTopology: true,
};
mongoose
  .connect(MONGODB, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
const bot = new TelegramBot(TOKEN, OPTIONS);

bot.setMyCommands([
  { command: "/start", description: "Start bot" },
  { command: "/info", description: "Bot info" },
]);

async function Main() {
  await bot.on("text", (message) => Controllers.MessageController(message, bot));
  await bot.on("contact", (message) => Controllers.ContactController(message, bot));
}
Main()