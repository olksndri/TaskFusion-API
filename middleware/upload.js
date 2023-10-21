const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");

const limits = {
  fileSize: 5242880,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `_${Date.now()}_${Math.round(
      Math.random() * 1e9
    )}.jpg`;
    const filename = file.fieldname + uniqueSuffix;
    cb(null, filename);
  },
});

const upload = multer({ storage, limits });

module.exports = {
  upload,
};
