const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const filepath = Date.now() + "-" + file.originalname;
    cb(null, filepath);
  },
});

const upload = multer({ storage: storageEngine });

module.exports = upload;
