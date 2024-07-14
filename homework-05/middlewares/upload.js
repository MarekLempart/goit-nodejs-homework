// homework-05/middlewares/upload.js

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { setupFolder } = require("../services/helpers");
const tempDir = path.join(__dirname, "../public/tmp");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await setupFolder(tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const mimetypeWhiteList = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];

    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(new Error("File isn't a photo"), false);
    }
    return cb(null, true);
  },
});

module.exports = upload;
