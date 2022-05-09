const axios = require("axios");
const BotUserModel = require("./users/BotUserModel");
const CilientModel = require("./client/ClientModel");
const keyboards = require("./keyboards/Keyboards");
const InlineKeyboards = require("./keyboards/InlineKeyboards");
const Functions = require("./Functions");
module.exports = class Controllers {
  static async MessageController(message, bot) {
    const chat_id = message.chat.id;
    const text = message.text;
    const contact = message.contact;
    const first_name = message.from.first_name;
    const user = await BotUserModel.findOne({ chatID: chat_id });

    if (text === "/start") {
      // const res = await axios.get("http://localhost:5000/service");

      if (!user) {
        await Functions.setUser(bot, message);
      } else if (user.step === 1) {
        await bot.sendMessage(
          chat_id,
          `Salom ${first_name} foydalanish uchun telefon raqamizni yuboring!`,
          {
            reply_markup: {
              resize_keyboard: true,
              one_time_keyboard: true,
              remove_keyboard: true,
              keyboard: keyboards.setKeyboard,
            },
          }
        );
      } else {
        await bot.sendMessage(chat_id, `Salom ${first_name}`, {
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboards.setMainKey,
          },
        });
      }
    } else if (contact && user.step === 1) {
      const client = await CilientModel.findOne({ tel: contact.phone_number});

      if (client) {
        console.log(contact);
        await Functions.setPhone(contact, bot, chat_id, user);
      } else {
        await bot.sendMessage(chat_id, "Siz botdan foydalana olmaysiz !");
      }
    } else if (text === "Service" && user.step === 2) {
      await Functions.setService(bot, chat_id);
    } else if (text === "Meeting") {
      await bot.sendMessage(chat_id, "Quydagi url manzil orqali bo'laning 👇", {
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          inline_keyboard: InlineKeyboards.setInlineMeet,
        },
      });
    } else {
      await bot.sendMessage(chat_id, "belgilanmagan buyruq!");
    }
  }
  static async InlineController(message, bot) {
    const chat_id = message.from.id;
    if (message.data === "ok") {
      await bot.editMessageText("Tasdiqlandi", {
        chat_id: chat_id,
        message_id: message.message.message_id,
      });
      // await bot.deleteMessage(chat_id, message.message.message_id);
    } else if (message.data === "no") {
      await bot.editMessageText("Amal bekor qilindi", {
        chat_id: chat_id,
        message_id: message.message.message_id,
      });
    }
    console.log(message.message.message_id);
  }
};
