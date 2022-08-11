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

    // Enlever cette colonne 'userId' si on veut pourvoir supprimer un compte ainsi que tout ses Posts,commentaires,likes... privilégier des relations entre les différentes tables
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  return Posts;
};
