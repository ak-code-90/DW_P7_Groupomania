const express = require('express');                                                          // Import d'express pour pouvoir utiliser son système de router;
const router = express.Router();                                                               // Import du router d'express
const { Posts } = require('../models')                                                        // Import du model Posts



router.get("/", async (req, res) => {                                                          //comportement du server lors d'une requête GET sur "/posts"

    try {
        const listOfPosts = await Posts.findAll();
        res.json(listOfPosts);
    }

    catch (error) { res.send(error) }
});



router.post("/", async (req, res) => {                                                               //comportement du server lors d'une requête POST sur "/posts"
    try {
        const post = req.body;
        await Posts.create(post);
        res.json(post);
    }

    catch (error) { res.send(error) }
})


module.exports = router;