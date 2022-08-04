module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });

  return Likes;
};
