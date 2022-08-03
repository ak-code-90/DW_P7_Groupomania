const express = require('express'); // Import d'express pour pouvoir utiliser son système de router;
const router = express.Router(); // Import du router d'express
const { Users } = require('../models'); // Import du model Posts
const upload = require('../middlewares/multer-config');
const { validateToken } = require('../middlewares/auth');

const UserCtrl = require('../controllers/users');

router.post('/', UserCtrl.createUser); // route de création d'un utilisateur
router.post('/login', UserCtrl.loginUser); // route d'identification d'un utilisateur
router.get('/auth', validateToken, UserCtrl.checkValidToken);

// router.put('/:id',upload, PostCtrl.editOneUser);      // route de modification d'utilisateur
// router.delete('/:id', PostCtrl.deleteOneUser);          // route de suppression d'utilisateur

module.exports = router;
