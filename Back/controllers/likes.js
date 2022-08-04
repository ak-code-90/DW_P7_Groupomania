const { Likes } = require('../models');

exports.likePost = async (req, res, next) => {
  const UserId = userInfo.validToken.id;
  const { PostId } = req.body;

  try {
    const userHasAlreadyLiked = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });

    console.log(userHasAlreadyLiked);

    if (!userHasAlreadyLiked) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.status(200).json('Le post à bien été liké !');
    } else {
      await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
      res.status(200).json('Le post à bien été disliké !');
    }
  } catch (error) {
    res.json({ error: error });
  }
};
