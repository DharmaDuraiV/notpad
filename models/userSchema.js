const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  profilePic: {
    type: [""],
    default: "https://shorturl.at/zT5FE",
  },
  username: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your Email"],
    unique: [true, "Your email is Already exists"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide valid Email Format"],
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    minlength: [5, "password should be more then 5 character"],
    maxlength: [20, "password should be less then 20 character"],
    trim: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.correctPassword = async function (
  userPassword,
  existpassword
) {
  return await bcrypt.compare(userPassword, existpassword);
};
const User = model("user", userSchema);

module.exports = User;
