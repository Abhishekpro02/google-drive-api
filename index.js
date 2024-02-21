const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

app.post("/upload", upload.any(), async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files);
    const { files } = req;

    const publicUrls = [];
    for (let f = 0; f < files.length; f += 1) {
      const publicUrl = await uploadFile(files[f]);
      publicUrls.push(publicUrl);
    }

    res.status(200).json({ message: "Form Submitted", publicUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const uploadFile = async (fileObject) => {
  try {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    const res = await google.drive({ version: "v3", auth }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: ["1v_ZJ4aJb-DmV27aYSWdM-Qkr3Lh9Rgss"],
      },
      fields: "id,name,webViewLink,webContentLink", // Use webViewLink instead of webContentLink
    });

    // console.log(`Uploaded file ${res.data.name} ${res.data.id}`);
    console.log(res.data);

    // Now you can use res.data.webViewLink to get the view link
    return res.data.webContentLink;
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw error;
  }
};

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running..🐰🐰",
  });
});

app.listen(5050, () => {
  console.log("Form running on port 5050");
});
