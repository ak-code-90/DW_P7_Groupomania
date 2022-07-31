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

// module.exports = (res, req, next) => {
//   const accessToken = req.header('accessToken');

//   if (!accessToken) return res.json({ error: 'Utilisateur non connecté !' });

//   try {
//     const validToken = jwt.verify(accessToken, 'test2525');
//     console.log(validToken);

//     return next();
//   } catch (err) {
//     console.log(err);
//   }
// };

//code du p6

// try {                                                                               // on utilise des blocks try, catch, car bcp d'éléments peuvent poser problème ici
//     const token = req.headers.authorization.split(' ')[1];                            // on récupère le token ds le header authorization, split() permet d'omettre le mot 'Bearer'
//     const decodedToken = jwt.verify(token, `${process.env.RANDOM_TOKEN_SECRET}`);     // on décode le token d'authentification crée dans le controller login
//     const userId = decodedToken.userId;                                               // on récupère l'id de l'utilisateur via ce token
//     if (req.body.userId && req.body.userId !== userId) {                              // si on a un user id dans le corps de la requete front et que celui ci est différent de l'id du token
//       throw 'Identifiant utilisateur invalide';                                                        // alors on affiche un message d'erreur
//     } else {
//       next();                                                                         // sinon on passe au controller de la route
//     }
//   } catch {
//     res.status(403).json({ error: new Error('Requête non authentifiée !') });
//   }
