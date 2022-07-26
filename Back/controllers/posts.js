
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

        let data = {
            image: req.file.path,
            postText: req.body.postText,
            username: req.body.username,
            userPic: req.body.userPic,

        }
        console.log(55);

        await Posts.create(data);
        res.json(data);

        // const post = req.body;                            // code fonctionnel
        // await Posts.create(post);
        // res.json(post);
    }

    catch (error) { res.send(error) }
}