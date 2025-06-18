const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const AppError = require("../utils/AppError");

/*
 @access public 
 @http method POST 
 @endpoint /api/v1/createPost
 */
exports.createPost = async (req, res) => {
  console.log("qwer", req.user._id);
  try {
    const payload = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      authorId: req.user._id,
    };

    const post = await Post.create(payload);
    res.status(201).json({
      status: "success",
      message: "Data inserted sucessfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 @access public 
 @http method GET 
 @endpoint /api/v1/getAllPost
 */

exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json({
      status: "success",
      totalDoc: post.length,
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 @access public 
 @http method GET 
 @endpoint /api/v1/getSinglePost/:id
 */

exports.getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 @access public 
 @http method PUT 
 @endpoint /api/v1/updateSinglePost/:id
 */

exports.updateSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    let query = { _id: id };

    if (req.user.role !== "admin") {
      query.authorId = req.user.id;
    }

    const updatedPost = await Post.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return next(new AppError("Post not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedPost,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 @access public 
 @http method DELETE 
 @endpoint /api/v1/deleteSinglePost/:id
 */

exports.deleteSinglePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    let query = { _id: id };

    if (req.user.role !== "admin") {
      query.authorId = req.user.id;
    }

    const deletedPost = await Post.findOneAndDelete(query);

    if (!deletedPost) {
      return next(new AppError("Post not found or you're not authorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
 @access public 
 @http method patch
 @endpoint /api/v1/updatePhote/:id
 */

// exports.updatePhoto = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await Post.updateOne(
//       { _id: id },
//       { $set: { photo: req.file } },
//       { new: true }
//     );

//     res.status(201).json({
//       status: "success",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

/*
 @access private 
 @http method get
 @endpoint /api/v1/auth/getAllCurrentUserData
 */

exports.getCurrentUserPostData = async (req, res, next) => {
  try {
    const post = await Post.find({ authorId: req.user.id });
    if (!post) {
      return next(new AppError("Post not created", 204));
    }
    res.status(200).json({
      status: "success",
      numberOfPost: post.length,
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
