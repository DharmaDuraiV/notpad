const express = require("express");
const postController = require("../controllers/postController");
const { protect, authorize } = require("../controllers/authController");
const router = express.Router();

router.get("/getAllPost", protect, postController.getAllPost);
router.post(
  "/createPost",
  protect,
  authorize("admin"),
  postController.createPost
);

router.post("/getSinglePost/:id", protect, postController.getSinglePost);

router.put(
  "/updateSinglePost/:id",
  protect,
  authorize("admin"),
  postController.updateSinglePost
);
router.delete(
  "/deleteSinglePost/:id",
  protect,
  authorize("admin"),
  postController.deleteSinglePost
);

// router.patch(
//   "/updatePhoto/:id",
//   upload.single("photo"),
//   postController.updatePhoto
// );

module.exports = router;
