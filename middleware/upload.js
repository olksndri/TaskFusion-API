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

// ? Usage:
// *  router.patch('/edit', upload.single("avatar", 1))
// * First arg = file.fieldName value = avatar; Sec arg = quantity of files = 1;
// * multer adds req.file = info about file, will be able in next controllers

// ? For future: avatar max size: 124 x 124;

module.exports = {
  upload,
};

// app.post("/profile", upload.single("avatar"), function (req, res, next) {
// req.file - файл `avatar`
// req.body сохранит текстовые поля, если они будут
// });

// app.post(
//   "/photos/upload",
//   upload.array("photos", 12),
//   function (req, res, next) {
//     // req.files - массив файлов `photos`
//     // req.body сохранит текстовые поля, если они будут
//   }
// );

// const cpUpload = upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "gallery", maxCount: 8 },
// ]);
// app.post("/cool-profile", cpUpload, function (req, res, next) {
//   // req.files - объект (String -> Array), где fieldname - ключ, и значение - массив файлов
//   //
//   // например:
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body сохранит текстовые поля, если они будут
// });
