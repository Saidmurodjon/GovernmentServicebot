const axios = require("axios");
const UserModel = require("./users/UserModel");
const keyboards = require("./keyboards/Keyboards");
const InlineKeyboards=require('./keyboards/InlineKeyboards')
const Functions = require("./Functions");
module.exports = class Controllers {
  static async MessageController(message, bot) {
    const chat_id = message.chat.id;
    const text = message.text;
    const contact = message.contact;
    const first_name = message.from.first_name;
    const user = await UserModel.findOne({ chatID: chat_id });

    if (text === "/start") {
      // const res = await axios.get("http://localhost:5000/service");

      if (!user) {
        await Functions.setUser(bot, message);
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
      const arr = [
        {
          _id: 1,
          phone: "+998911312072",
        },
        {
          _id: 2,
          phone: "+998911312070",
        },
        {
          _id: 3,
          phone: "+998911312071",
        },
        {
          _id: 4,
          phone: "+998911312073",
        },
      ];
      const contactCheck = arr.find(
        (item) => item.phone === contact.phone_number
      );
      if (contactCheck) {
        await Functions.setPhone(contact, bot, chat_id, user);
      } else {
        await bot.sendMessage(chat_id, "Siz botdan foydalana olmaysiz !");
      }
    } else if (text === "Service" && user.step === 2) {
      await Functions.setService(bot, chat_id);
    }else if (text === "Meeting") {
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
    if(message.data==="ok"){
      await bot.sendMessage(chat_id, "Tasdiqlandi");
    }else if(message.data==="no"){
      await bot.sendMessage(chat_id, "Tasdiqlamadi");

    }
    console.log(message);
  }
};
