const CustomError = require("../error/CustomError");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);

    if (file.fieldname === "photo") {
      cb(null, path.join(rootDir, "/public/userPhotos"));
    } else {
      cb(null, path.join(rootDir, "/public/storyImages"));
    }
  },

  filename: function (req, file, cb) {
    if (file.fieldname === "photo" && req.user && req.user.id) {
      const extension = file.mimetype.split("/")[1];
      req.savedUserPhoto = "photo_user_" + req.user.id + "." + extension;
      cb(null, req.savedUserPhoto);
    } else {
      // Adjusted the filename to use Date.now() for uniqueness
      req.savedStoryImage =
        "image_" + Date.now() + "_" + file.originalname;
      cb(null, req.savedStoryImage);
    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/heic",
    "image/heif",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid image file", 400), false);
  }

  cb(null, true);
};

const imageUpload = multer({ storage, fileFilter });

module.exports = imageUpload;
