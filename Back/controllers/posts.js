const fs = require('fs');
const { Posts } = require('../models');

exports.getAllPosts = async (req, res, next) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  } catch (error) {
    res.send(error);
  }
};

exports.createPost = async (req, res) => {
  //comportement du server lors d'une requête POST sur "/posts"
  try {
    let data = {};
    console.log(userInfo.validToken.id);
    const username = userInfo.validToken.username; //on recupère le nom d'utilisateur récupéré dans le middleware d'authentification
    const userId = userInfo.validToken.id;

    if (req.file) {
      data = {
        image: req.file.path,
        postText: req.body.postText,
        username: username,
        userId: userId,
        userPic: req.body.userPic,
      };
    } else {
      data = {
        image: '',
        postText: req.body.postText,
        username: username,
        userId: userId,
        userPic: req.body.userPic,
      };
    }

    await Posts.create(data);
    res.json(data);
  } catch (error) {
    res.send(error);
  }
};
