//upload de fichiers par les utilisateurs

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    console.log(file);

    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('postImg');

module.exports = upload;
