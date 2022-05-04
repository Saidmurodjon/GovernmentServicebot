const axios = require("axios");
const UserModel = require("./users/UserModel");
const keyboards = require("./keyboards/Keyboards");
const Functions = require("./Functions");
module.exports = class Controllers {
  static async MessageController(message, bot) {
    const chat_id = message.chat.id;
    const user_id = message.from.id;
    const text = message.text;

    if (text === "/start") {
      // const res = await axios.get("http://localhost:5000/service");
      const user = await UserModel.findOne({ chatID: chat_id });

      console.log(user);
      if (!user) {
        return bot.sendMessage(
          chat_id,
          "Botdan foydalanish uchun telefon raqamingizni yuboring!",
          {
            reply_markup: {
              resize_keyboard: true,
              one_time_keyboard: true,
              keyboard: keyboards.setKeyboard,
            },
          }
        );
      } else {
        bot.sendMessage(chat_id, "ok");
        // try {
        //   const category = new UserModel({
        //     chatID: chat_id,
        //     date: "123",
        //   });

        //   category.save(category);
        //   return bot.sendMessage(chat_id, "yaratildi");
        // } catch (err) {
        //   return bot.sendMessage(chat_id, "Hatolik");
        // }
      }
      // console.log(respons);
    }
  }
  static async ContactController(message, bot) {
    const chat_id = message.chat.id;
    const contact = message.contact;

    const user = await UserModel.findOne({ chatID: chat_id });
 if(!user){
      await Functions.setPhone(contact, bot, chat_id);
      // console.log(contact.phone_number);
    }else{
      await bot.sendMessage(chat_id,'Belgilanmagan habar')
    }
  }
};
