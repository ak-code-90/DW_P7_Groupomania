const { Likes } = require('../models');

exports.likePost = async (req, res, next) => {
  const UserId = userInfo.validToken.id;
  const { PostId } = req.body;

  try {
    //recherche d'un like dans la DB qui contient l'identifiant de l'utilisateur qui effectue la requête et qui contient l'id du post liké
    const userHasAlreadyLiked = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });

    //si l’utilisateur n’a jamais liké, on crée un like dans la table, sinon on supprime le like
    if (!userHasAlreadyLiked) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.status(200).json({ liked: true });
    } else {
      await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    res.json({ error: error });
  }
};
