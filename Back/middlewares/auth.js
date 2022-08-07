const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');

  if (!accessToken) return res.json({ error: 'utilisateur non connecté' });

  try {
    const validToken = verify(accessToken, `2525`);

    userInfo = { validToken };

    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = { validateToken };
