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

app.post('/upload', upload.array('photos'), async (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename);
    res.status(200).json({ filenames });
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ error: 'Failed to upload photos' });
  }
});

app.listen(5000, () => {
  console.log("server is listening...");
});

