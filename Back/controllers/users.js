const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
      });
      res.json('utilisateur inscrit !');
    });
  } catch (error) {
    res.json(error.message);
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
            token: jwt.sign({ username: user.username, id: user.id }, '2525', {
              expiresIn: '24h',
            }),
          });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};
