const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define the storage location and the filename format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where the file will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Use the file's original name
    cb(null, file.originalname);
  },
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage: storage });

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // File has been successfully uploaded
    console.log(`File uploaded: ${req.file.originalname}`);
    res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
  } catch (error) {
    console.error('Error while uploading file:', error);
    res.status(500).json({ message: 'File upload failed!' });
  }
});

// app.get('/files', (req, res) => {
//   fs.readdir('uploads/', (err, files) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.json(files.map(file => ({ name: file, path: `/uploads/${file}` })));
//   });
// });

// app.delete('/delete/:filename', (req, res) => {
//   const filePath = path.join('uploads', req.params.filename);
//   fs.unlink(filePath, err => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.sendStatus(200);
//   });
// });


app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
})