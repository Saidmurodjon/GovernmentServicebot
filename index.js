const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from
const token = "5127738101:AAGbPLH0jSYW_i-ayZtkG2cSCr_63sKocjY";
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const url = "https://telegram.org/img/t_logo.png";
  bot.sendPhoto(chatId, url);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId,msg.text );  
});
