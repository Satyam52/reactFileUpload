const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());

//Upload Endpoint

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
    res.json({ fileName: file.name, filePath: "/uploads/${file.name}" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
