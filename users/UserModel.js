const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  chatID: String,
  date: String,
  phone:String,
  step:{
    type:Number,
    default:1
  }

});
const UserModel = mongoose.model("UsertModel", UserSchema);
module.exports = UserModel;