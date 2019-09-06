const fs = require("fs");
const mongoose = require("mongoose");
const gridfs = require("gridfs-stream");
const bodyParser = require("body-parser");
const PDFLatexGenerator = require("../latex/PDFLatex");

/** Required to connect to MongoDB - repeat code from routes.js */
const mongoURI =
  "mongodb://admin:admin@ds239648.mlab.com:39648/application-tracker";
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  gfs = gridfs(conn.db, mongoose.mongo);
});
/** End of required code to connect to MongoDB */

module.exports = {
  async getSingleDocument(req, res) {
    const { userEmail, fileID } = req.params;
    const mongoObjectID = mongoose.Types.ObjectId(fileID);

    /** Return the specified document that belongs to the user  */
    gfs.files.findOne(
      { _id: mongoObjectID, "metadata.userEmail": userEmail },
      function(err, file) {
        if (!file || file.length === 0) {
          return res.status(403).send({
            error: "ERROR: Looks like you need to upload some more files 😝"
          });
        }

        /** Is the retrieved file type either .pdf, .docx or .doc? */
        if (
          file.contentType === "application/pdf" ||
          file.contentType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.contentType === "application/msword"
        ) {
          /** Open the file with the respective file name to stream */
          const readstream = gfs.createReadStream(file.filename);
          /**
           * We want to stream the file to the client and let the server act as a proxy to the file!
           * We'll read and constantly stream the file to the browser as an octet-stream
           */
          res.contentType("application/octet-stream");
          readstream.pipe(res);

          readstream.on("error", err => {
            // If there are errors, let's respond with a status of 500!
            // A response should be sent, otherwise the users will be kept waiting
            // until Connection Time out
            res.status(500).send(err);
            // console.log("ERROR: Unable to retrieve document!", err);
          });
        } else {
          return res.status(403).json({
            error: "ERROR: Retrieved file is not a supported file type!"
          });
        }
      }
    );
  },
  async getAllDocuments(req, res) {
    const userEmail = req.params.userEmail;

    /** Returns an array of all files that belong to the user's e-mail address */
    gfs.files
      .find({ "metadata.userEmail": userEmail })
      .toArray(function(err, files) {
        if (!files || files.length === 0) {
          return res.status(400).send({
            error: "ERROR: Looks like you need to upload some more files 😝"
          });
        }

        return res.json(files);
      });
  },
  async uploadResume(req, res) {
    if (!req.file) {
      return res.status(403).send({
        error: `ERROR: An error occurred during file upload!`
      });
    }
    /** At this point, the file has been saved directly into Mongo using multer from within /app/server/src/routes.js! */
    return res.status(200).send({
      success: `SUCCESS: Uploaded ${req.file.originalname}!`
    });
  },
  async getResumeInputs(req, res) {
    try {
      const singleField = req.body;
      if (singleField) {
        /** CURRENTLY NOT IMPLEMENTED PROPERLY - Sean on March 20 */
      }
      res.send(singleField);
    } catch (err) {
      return res.status(500).send({
        error: "Error retrieving resume fields"
      });
    }
  },
  async generateResume(req, res) {
    try {
      var pdf = PDFLatexGenerator.generatePDF(req.body);

      res.contentType("application/pdf");
      res.send(pdf);
    } catch (err) {
      return res.status(403).send({
        error: `Error generating the pdf!`
      });
    }
  }
};
