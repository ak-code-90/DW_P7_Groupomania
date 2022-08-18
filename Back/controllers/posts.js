const fs = require('fs');
const { Posts, Likes } = require('../models');

exports.getAllPosts = async (req, res, next) => {
  try {
    //récupération de tous les posts de la DB
    const listOfPosts = await Posts.findAll({
      order: [['createdAt', 'DESC']], // création d'une liste de posts dans l'ordre antéchronologique
      include: [Likes], //on inclut un tableau de likes à chaque post
    });

    //récupération de la liste des likes de l'utilisateur
    const likedPosts = await Likes.findAll({
      where: { UserId: userInfo.validToken.id },
    });

    //envoi des infos récoltées
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch (error) {
    res.send(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const file = req.file;

    let data = {};

    //récupération des données utilisateur depuis le middleware d'authentification
    const username = userInfo.validToken.username;
    const userId = userInfo.validToken.id;

    //création d'un post à stocker dans la DB, selon si l'utilisateur à ajouté une image ou non
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

    //ajout du post à la DB
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
    let newPost = {};

    const postId = req.params.postId;

    //recherche d'un post dans la DB qui correspond à celui de la requête
    const postToUpdate = await Posts.findOne({ where: { id: postId } });

    //récupération des infos de l'utilisateur via le middleware d'authentification
    const userId = userInfo.validToken.id;
    const userRole = userInfo.validToken.userRole;

    //vérification des droits de l'utilisateur
    if (postToUpdate.userId === userId || userRole === 'isAdmin') {
      //création du nouveau post à stocker dans la DB, selon si l'utilisateur à ajouté une image ou non
      if (req.file) {
        newPost = {
          username: postToUpdate.username,
          userId: postToUpdate.userId,
          postText: req.body.postText,
          image: req.file.path,
          userPic: postToUpdate.userPic,
        };
      } else {
        newPost = {
          image: '',
          postText: req.body.postText,
          username: postToUpdate.username,
          userId: postToUpdate.userId,
          userPic: postToUpdate.userPic,
        };
      }

      //maj du post dans la DB
      await Posts.update(newPost, { where: { id: postId } });
      res.status(200).json('Le post a été modifié avec succès');
    } else {
      res.status(401).json('Vous ne pouvez pas modifier ce post');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const userId = userInfo.validToken.id;
    const userRole = userInfo.validToken.userRole;

    const postToDelete = await Posts.findOne({ where: { id: postId } });

    //récupération de l'identifiant de l'image dans la DB
    const filename = postToDelete.image.split('images\\')[1];
    console.log();

    if (postToDelete.userId === userId || userRole === 'isAdmin') {
      if (filename) {
        //suppréssion de l'image dans le dossier local
        fs.unlink(`images\\${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log("l'image a bien été supprimé depuis le dossier local");
          }
        });
      }

      //suppréssion du post dans la DB
      await Posts.destroy({ where: { id: postId } });
      res.status(200).json('Le post a bien été supprimé');
    } else {
      res.status(401).json('Vous ne pouvez pas supprimer ce post');
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
