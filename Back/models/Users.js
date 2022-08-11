module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      min: 2,
      max: 20,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        min: 5,
        max: 35,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    userPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     onDelete: 'cascade',
  //   });
  // };

  // Posts.belongsTo(Users);

  // Users.associate = (models) => {
  //   //on associe la table user à la table posts
  //   Users.hasMany(models.Posts, {
  //     onDelete: 'cascade',
  //   });
  // };

  return Users;
};
