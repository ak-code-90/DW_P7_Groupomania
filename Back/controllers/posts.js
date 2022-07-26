const fs = require('fs');
const { Posts } = require('../models')


exports.getAllPosts = async (req, res, next) => {
    try {
        const listOfPosts = await Posts.findAll();
        res.json(listOfPosts);
    }

    catch (error) { res.send(error) }
};

exports.createPost = async (req, res) => {                                                               //comportement du server lors d'une requête POST sur "/posts"
    try {
        const post = req.body;
        await Posts.create(post);
        res.json(post);
    }

    catch (error) { res.send(error) }
}