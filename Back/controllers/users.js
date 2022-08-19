const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
      await Users.create({
        username: username,
        email: email,
        password: hash,
        role: role,
        userPic: '',
      });
      res.json('utilisateur inscrit !');
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      res.status(400).json({ error: 'Utilisateur introuvable !' });
    } else
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          res.status(400).json({ error: 'Mot de passe incorrect !' });
        } else
          res.status(200).json({
            token: jwt.sign(
              {
                username: user.username,
                id: user.id,
                userRole: user.role,
                userPic: user.userPic,
              },
              `${process.env.RANDOM_TOKEN_SECRET}`,
              {
                expiresIn: '24h',
              }
            ),
          });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//ce midleware va permettre d'envoyer toutes les informations d'un utilisateur lorsqu'il est connecté,
//ces infos seront stockées dans un context React et cela nous évite d'effectuer un trop gros nombres de requêtes.
exports.checkValidToken = async (req, res) => {
  try {
    const username = userInfo.validToken.username; // on recupère les données utilisateur récupérés dans le middleware d'authentification
    const userId = userInfo.validToken.id;
    const userRole = userInfo.validToken.userRole;
    const userPic = userInfo.validToken.userPic;

    res.status(200).json({
      username: username,
      userId: userId,
      userRole: userRole,
      userPic: userPic,
    });
  } catch (error) {
    console.log(error);
  }
};
