const express = require("express");
const postController = require("../controllers/postController");
const { protect, authorize } = require("../controllers/authController");
const router = express.Router();

router.get("/getAllPost", protect, postController.getAllPost);
router.post(
  "/createPost",
  protect,
  authorize("publisher", "admin"),
  postController.createPost
);

router.get(
  "/getCurrentUserPostData",
  protect,
  authorize("publisher", "admin"),
  postController.getCurrentUserPostData
);

router.post("/getSinglePost/:id", protect, postController.getSinglePost);

router.put(
  "/updateSinglePost/:id",
  protect,
  authorize("admin", "publisher"),
  postController.updateSinglePost
);
router.delete(
  "/deleteSinglePost/:id",
  protect,
  authorize("admin", "publisher"),
  postController.deleteSinglePost
);

// router.patch(
//   "/updatePhoto/:id",
//   upload.single("photo"),
//   postController.updatePhoto
// );

module.exports = router;
