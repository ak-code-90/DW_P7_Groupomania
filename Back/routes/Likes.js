const express = require('express'); // Import d'express pour pouvoir utiliser son système de router;
const router = express.Router(); // Import du router d'express
const { Likes } = require('../models'); // Import du model Posts
const { validateToken } = require('../middlewares/auth');

const LikeCtrl = require('../controllers/likes');

router.post('/', validateToken, LikeCtrl.likePost);

module.exports = router;
