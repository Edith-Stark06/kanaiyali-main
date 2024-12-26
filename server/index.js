const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();
const { eventModel, oviyamModel, sirukadhaiModel, puthagamModel, vasanamModel, vidukadhaiModel, naatkurippuModel } = require('./mongo');

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  origin: 'https://kanaiyali-main.vercel.app',
  methods: ["POST", "GET"],
  credentials: true
}));

const upload = multer({ dest: 'uploads/' });

const models = {
  kavithai: eventModel,
  oviyam: oviyamModel,
  sirukadhai: sirukadhaiModel,
  puthagam: puthagamModel,
  vasanam: vasanamModel,
  vidukadhai: vidukadhaiModel,
  naatkurippu: naatkurippuModel
};

app.post("/:type", async (req, res) => {
  const { type } = req.params;
  const model = models[type];
  if (!model) return res.status(400).send("Invalid content type");

  const { title, subtitle, date, authorName, content, addedPhotos } = req.body;
  try {
    const doc = await model.create({ title, subtitle, date, authorName, content, photos: addedPhotos });
    res.send(doc);
  } catch (err) {
    res.status(500).send("Error creating document");
  }
});

app.post("/uploads", upload.array('photo', 100), (req, res) => {
  const upfiles = req.files.map(file => {
    const ext = file.originalname.split('.').pop();
    const newPath = `${file.path}.${ext}`;
    fs.renameSync(file.path, newPath);
    return newPath.replace(`${__dirname}/uploads/`, '');
  });
  res.json(upfiles);
});

app.listen(5000, () => console.log("Server is running on port 5000"));
