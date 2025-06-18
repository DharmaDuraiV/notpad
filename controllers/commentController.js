const Comment = require("../models/commentSchema");

exports.createComment = async (req, res, next) => {
  try {
    const uid = req.user.id;
    const pid = req.params.id;
    // console.log("uid", uid, "---", "pid --", pid);
    const newComment = await Comment.create({
      text: req.body.text,
      postId: pid,
      userId: uid,
    });
    res.status(201).json({
      status: "success",
      message: "Comments added successFully..!",
      newComment,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCommentsByPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const user = { userId: req.user.id };

    const comments = await Comment.find({ postId });

    res.status(200).json({
      status: "success",
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
