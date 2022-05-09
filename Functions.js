const UserModel = require("./users/BotUserModel");
const keyboards = require("./keyboards/Keyboards");
const InlineKeyboards = require("./keyboards/InlineKeyboards");
module.exports = class Functions {
  // User saqlash
  static async setUser(bot, message) {
    const chat_id = message.chat.id;
    const text = message.text;
    const contact = message.contact;
    const first_name = message.from.first_name;
    try {
      const category = await new UserModel({
        chatID: chat_id,
        date: new Date(),
        step: 1,
      });
      category.save(category);
      await bot.sendMessage(
        chat_id,
        `${first_name} Telefon raqamingizni yuboring!`,
        {
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            remove_keyboard: true,
            keyboard: keyboards.setKeyboard,
          },
        }
      );
    } catch (err) {
      await bot.sendMessage(chat_id, "Hatolik");
    }
  }
  // Contact saqlash
  static async setPhone(contact, bot, chat_id, user) {
    try {
      const category = {
        step: 2,
        phone: contact.phone_number,
      };
      await UserModel.findByIdAndUpdate(user._id, category);
      await bot.sendMessage(chat_id, `Contact yaratildi! `, {
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: keyboards.setMainKey,
        },
      });
    } catch (err) {
      await bot.sendMessage(chat_id, "Hatolik");
    }
  }
  // Service chaqirish
  static async setService(bot, chat_id) {
    try {
      await bot.sendMessage(chat_id, `Tamirlash hizmatiga murojaat qilmoqchimisiz ? `, {
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          remove_keyboard: true,
          inline_keyboard: InlineKeyboards.setInlineKey,
        },
      });
    } catch (err) {
      await bot.sendMessage(chat_id, "Service Hatolik");
    }
  }
};
