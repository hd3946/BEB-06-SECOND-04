// 토큰 아이디 저장 4자리
// mint 할때 토큰아이디 나오는데 DB테이블에 저장 NFT 조회할때 가져오기 
import Sequelize from 'sequelize';

export default class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tokenId: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Token',
        tableName: 'tokens',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Token.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
  }
};
