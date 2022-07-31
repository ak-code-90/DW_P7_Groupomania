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
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    userPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Posts;
};
