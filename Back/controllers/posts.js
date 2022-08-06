const fs = require('fs');
const { Posts, Likes } = require('../models');

exports.getAllPosts = async (req, res, next) => {
  try {
    const listOfPosts = await Posts.findAll({
      order: [['updatedAt', 'DESC']], // je crée la liste de posts dans l'ordre antéchronologique
      include: [Likes], //j'inclus la table Likes sous forme de tableau
    });
    res.json(listOfPosts);
  } catch (error) {
    res.send(error);
  }
};

exports.createPost = async (req, res) => {
  //comportement du server lors d'une requête POST sur "/posts"
  try {
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
    res.json(data);
  } catch (error) {
    res.json(error);
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
