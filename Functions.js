const UserModel = require("./users/UserModel");

module.exports = class Functions {
  static async setPhone(contact, bot, chat_id) {
    try {
      const category = await new UserModel({
        chatID: chat_id,
        date: "123",
        step: 1,
        phone: contact.phone_number,
      });
      category.save(category);
      return bot.sendMessage(chat_id, "yaratildi");
    } catch (err) {
      return bot.sendMessage(chat_id, "Hatolik");
    }
  }
};
