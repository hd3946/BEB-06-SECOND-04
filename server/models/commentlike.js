const Sequelize = require('sequelize');

module.exports = class CommentLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'CommentLike',
        tableName: 'commentlikes',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) { 
    db.CommentLike.belongsTo(db.User, { foreignKey: 'LikeUserId', targetKey: 'id' ,onDelete: 'cascade', onUpdate: 'cascade'  });
    db.CommentLike.belongsTo(db.Comment, { foreignKey: 'LikeCommentId', targetKey: 'id' ,onDelete: 'cascade', onUpdate: 'cascade'  });
  }
};
