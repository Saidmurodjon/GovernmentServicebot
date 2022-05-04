const TelegramBot = require("node-telegram-bot-api");
// const axois =require('axios') 
const Controllers=require('./controllers.js')
const { TOKEN } = require("./config.js");
const options={
  polling:true
}
const bot = new TelegramBot(TOKEN, options);

bot.setMyCommands([  
  {command:'/start',description:"Start bot"},
  {command:'/info',description:'Bot info'}
]);

bot.on("text", (message) => Controllers.MessageController(message, bot));

// const start=()=>{

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;
//   if (text === "/start") {
//     // const res = await axois.get(`http://localhost:5000/service`);
//     return bot.sendMessage(chatId, "contact",);
//   }
//   return bot.sendMessage(chatId,"Nomalum so'z")
// });

// }
// start()