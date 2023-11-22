const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = process.env.PORT ?? 3000;

// Configuración de multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// Ruta para manejar la subida de archivos de audio
app.post('/upload', upload.single('audio'), (req, res) => {
  const fileName = req.file.filename;
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
  res.json({ success: true, fileUrl });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor web escuchando en http://localhost:${port}`);
});
