import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
if (dotenv.error) throw dotenv.error

//import env from 'development'; //production  process.env.NODE_ENV
import config from '../config/config.js';
// config[env];
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';
import Hashtag from './hashtag.js';
import PostLike from './postlike.js';
import CommentLike from './commentlike.js';
import Token from './token.js';

const db = {};

console.log('값확인', config);

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.PostLike = PostLike;
db.CommentLike = CommentLike;
db.Hashtag = Hashtag;
db.Token = Token;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
PostLike.init(sequelize);
CommentLike.init(sequelize);
Hashtag.init(sequelize);
Token.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
PostLike.associate(db);
CommentLike.associate(db);
Hashtag.associate(db);
Token.associate(db);

export { db, sequelize };
