const { Schema, model, default: mongoose } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  category: {
    type: String,
    required: [true, "description is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Make sure your User model collection name matches
    required: true,
  },
});

const Post = model("note", postSchema);
module.exports = Post;
