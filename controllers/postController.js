const Post = require("../models/postSchema");

/*
 @access public 
 @http method POST 
 @endpoint /api/v1/createPost
 */
exports.createPost = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      authorId: req.user.id,
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

exports.updateSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.updateOne({ _id: id }, { $set: req.body });
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
 @http method DELETE 
 @endpoint /api/v1/deleteSinglePost/:id
 */

exports.deleteSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
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
