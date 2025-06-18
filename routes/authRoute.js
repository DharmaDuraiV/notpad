const express = require("express");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/register",
  upload.single("profilePic"),
  authController.createUser
);

router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.put("/updateSingleuser/:id", authController.updateSingleuser);

module.exports = router;
