const Sequelize = require('sequelize');

module.exports = class PostLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'PostLike',
        tableName: 'postlikes',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) { 
    db.PostLike.belongsTo(db.User, { foreignKey: 'LikeUserId', targetKey: 'id' });
    db.PostLike.belongsTo(db.Post, { foreignKey: 'LikePostId', targetKey: 'id' });
  }
};
