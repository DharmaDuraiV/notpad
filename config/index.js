require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  JWT_EXPIRE_TOKEN: process.env.JWT_EXPIRE_TOKEN,
  JWT_EXPIRE_COOKIE_IN: process.env.JWT_EXPIRE_COOKIE_IN,
};
