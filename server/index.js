const express = require('express');
const cors = require('cors');
const app = express();
const { eventModel, oviyamModel, sirukadhaiModel, puthagamModel, vasanamModel, vidukadhaiModel, naatkurippuModel } = require('./mongo');
const imgdown = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors({
  origin: 'https://kanaiyali-main.vercel.app',
  methods: ["POST","GET"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("hi da");
});

app.post("/kavithai", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  console.log({ title, subtitle, date, authorName, content, addedPhotos });     
  const eveDoc = await eventModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

app.post("/oviyam", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  const eveDoc = await oviyamModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

app.post("/sirukadhai", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  const eveDoc = await sirukadhaiModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

app.post("/puthaga-vimarsanam", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  console.log({ title, subtitle, date, authorName, content, addedPhotos });     
  const eveDoc = await puthagamModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

app.post("/vasanam", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  const eveDoc = await vasanamModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

app.post("/vidukadhai", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  const eveDoc = await vidukadhaiModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

app.post("/naatkurippu", async (req, res) => {
  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  const eveDoc = await naatkurippuModel.create({
    title, subtitle, date, authorName, content, photos:addedPhotos
  });
  res.send(eveDoc);
});

const upload = multer({ dest: 'uploads/' });

app.post("/uploads", upload.array('photo', 100), (req, res) => {
  const upfiles = [];
  req.files.forEach(file => {
    const { path, originalname } = file;
    const orgparts = originalname.split(".");
    const ext = orgparts[orgparts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    // Store path relative to the '/uploads' directory
    const relativePath = newPath.replace(__dirname + '/uploads/', '');
    upfiles.push(relativePath);
    console.log("File uploaded to:", relativePath);
  });
  res.json(upfiles);
});


app.listen(5000, () => {
  console.log("server is listening...");
});

