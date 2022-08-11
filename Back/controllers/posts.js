const fs = require('fs');
const { Posts, Likes } = require('../models');

exports.getAllPosts = async (req, res, next) => {
  try {
    const listOfPosts = await Posts.findAll({
      order: [['createdAt', 'DESC']], // je crée la liste de posts dans l'ordre antéchronologique
      include: [Likes], //j'inclus la table Likes sous forme de tableau
    });

    const likedPosts = await Likes.findAll({
      where: { UserId: userInfo.validToken.id },
    });

    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch (error) {
    res.send(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const file = req.file;

    let data = {};

    const username = userInfo.validToken.username; // on recupère les données utilisateur récupérés dans le middleware d'authentification
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
    data.file = file;
    console.log(data);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    let response = {};
    console.log(req.body.postText);

    const postId = req.params.postId;
    const username = userInfo.validToken.username;
    const userId = userInfo.validToken.id;

    if (req.file) {
      response = {
        username: username,
        userId: userId,
        postText: req.body.postText,
        image: req.file.path,
        userPic: req.body.userPic,
      };
    } else {
      response = {
        image: '',
        postText: req.body.postText,
        username: username,
        userId: userId,
        userPic: req.body.userPic,
      };
    }

    await Posts.update(response, { where: { id: postId } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const postToDelete = await Posts.findOne({ where: { id: postId } });

    const filename = postToDelete.image.split('images\\')[1];

    fs.unlink(`images\\${filename}`, (err) => {
      if (err) console.log(err);
      else {
        console.log("l'image a bien été supprimé depuis le dossier local");
      }
    });

    await Posts.destroy({ where: { id: postId } }); // on détruit dans la DB le post qui se réfère au post envoyé par le front end
    res.status(200).json('Le post a bien été supprimé');
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
