const express = require("express");
const { protect } = require("../controllers/authController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/createComment/:id", protect, commentController.createComment);
router.get(
  "/getCommentsByPost/:id",
  protect,
  commentController.getCommentsByPost
);

module.exports = router;
