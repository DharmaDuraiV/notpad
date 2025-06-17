const mongodb = require("mongoose");
const { MONGODB_URL } = require("./index");
const url = MONGODB_URL;
const connectDB = async () => {
  try {
    await mongodb.connect(url);
    console.log("connect to mongodb server");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
