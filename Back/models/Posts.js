module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    postText: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

  //Association de la table posts à la table likes, de cette manière lorsque qu'un post est supprimé tous les likes
  //qui y sont associés le sont aussi.
  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  return Posts;
};
