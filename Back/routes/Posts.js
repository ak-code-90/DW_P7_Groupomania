const express = require('express'); // Import d'express pour pouvoir utiliser son système de router;
const router = express.Router(); // Import du router d'express
const { Posts } = require('../models'); // Import du model Posts
const upload = require('../middlewares/multer-config');
const { validateToken } = require('../middlewares/auth');

const PostCtrl = require('../controllers/posts');

router.post('/', validateToken, upload, PostCtrl.createPost);
router.put('/:postId', validateToken, upload, PostCtrl.updatePost);
router.get('/', validateToken, PostCtrl.getAllPosts);
router.delete('/:postId', validateToken, PostCtrl.deletePost);

module.exports = router;
