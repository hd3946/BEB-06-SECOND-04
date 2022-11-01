import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
          validate: {
            // notNull: { msg: 'User must have a email' },
            notEmpty: { msg: "Email must not be empty" },
            isEmail: { msg: "Must be a valid email address" },
          },
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
          validate: {
            notNull: { msg: "User must have a name" },
            notEmpty: { msg: "Name must not be empty" },
          },
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        profileurl: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post,       { foreignKey: 'userId' , sourceKey: 'id' });
    db.User.hasMany(db.Comment,    { foreignKey: 'commenter', sourceKey: 'id' });
    //db.User.hasOne(db.wallet)  지갑 테이블 db.wallet.belongsTo()
    db.User.hasOne(db.PostLike,    { foreignKey: 'LikeUserId', sourceKey: 'id' });
    db.User.hasOne(db.CommentLike, { foreignKey: 'LikeUserId', sourceKey: 'id' });
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers", //함수불러올때 이름을 정의해주는것
      through: "Follow", //중간테이블
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
};
