const ResumeController = require("./controllers/ResumeController");
const AuthenticationController = require("./controllers/AuthenticationController");
const AdminController = require("./controllers/AdminController");

/** For Multer middleware file uploading */
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

// Mongo URI
const mongoURI =
  "mongodb://admin:admin@ds239648.mlab.com:39648/application-tracker";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, formData) => {
    return {
      metadata: {
        originalFileName: req.body.originalFileName,
        userEmail: req.body.userEmail,
        tags: req.body.tags
      }
    };
  }
});

/** Our app can now use the variable below to upload directly into Mongo */
const upload = multer({ storage });

module.exports = app => {
  // Documents
  app
    .route("/view-resume/:userEmail/:fileID")
    .get(ResumeController.getSingleDocument),
    // Authentication
    app.route("/index/:userEmail").get(ResumeController.getAllDocuments),
    app.route("/register").post(AuthenticationController.Register),
    app.route("/login").post(AuthenticationController.Login),
    // Content Management
    app.route("/generate-resume").post(ResumeController.getResumeInputs),
    app.route("/generate-resume").post(ResumeController.generateResume),
    app
      .route("/upload-resume")
      .post(upload.single("file"), ResumeController.uploadResume),
    // Administrator Management
    app.route("/get-users/:userEmail").get(AdminController.getAllUsers),
    app.route("/toggle-status").post(AdminController.toggleUserStatus);
};
