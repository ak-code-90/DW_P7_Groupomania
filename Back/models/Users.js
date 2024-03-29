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
      validate: {
        //système de validation côté serveur
        is: {
          args: /^.{2,35}$/,
          msg: "Le nom d'utilisateur doit comprendre entre 2 et 15 caractères maximum",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Le format email renseigné est incorrect',
        },
        is: {
          args: /^.{8,}$/,
          msg: "l'email doit contenir 8 caractères minimum",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // pas de validation du mot de passe côté back-end pour pouvoir laisser le champs libre à Bcrypt ?
      validate: {
        // is: {
        //   args: /^.{8,73}$/, //la longueur max du hash de bcrypt est de 72 caractères.
        //   msg: 'Le mot de passe doit contenir au moins 8 caractères',
        // },
      },
    },
    userPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^isUser$/,
          msg: 'Le role doit être "isUser"',
        },
      },
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  return Users;
};
