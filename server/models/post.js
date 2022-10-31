const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Post.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    db.Post.hasMany(db.PostLike, { foreignKey: 'LikePostId', sourceKey: 'id' });

    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
