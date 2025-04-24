import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // Lokasi penyimpanan file
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`) // Nama file yang diunggah
  }
});

export const upload = multer({ storage: storage }).single('file');