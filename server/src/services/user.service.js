import { db } from "../models/index.js";
const { User, Post, PostLike, Comment, CommentLike } = db;

const getUserData = async (email, password) => {
  const data = await User.findOne({
      where: { email, password },
  });
  return data;
};

const createUser = async (email, password, nickname, address) => {
  const result = await User.create({
      email,
      nickname,
      password,
      address,
  });
  return result;
};

const getUserPost = async (userId) => {
  const postList = await Post.findAll({
    attributes: [
      ["id", "postId"],
      "title",
      "content",
      'img',
      "createdAt",
      "updatedAt",
    ],
    include: [
      { model: User, attributes: ["email", "nickname", 'profileurl']},
      { model: PostLike, 
        // attributes: [[ sequelize.fn('COUNT', 'id'), 'postLike' ]],
        include: [
          { model: User, 
          attributes: ['email', 'nickname', 'profileurl']}
        ],
        order: [['id', 'DESC']]
      },
      { model: Comment,
        attributes: [
          ["id", "commentId"],
          "content",
          "createdAt",
          "updatedAt",
          "commenter",
          "postId",
        ],
        include: [
          { model: User,
             attributes: ["email", "nickname", 'profileurl']},
          { model: CommentLike, 
            // attributes: [[ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
            include: [
              { model: User, 
              attributes: ['email', 'nickname', 'profileurl']}
            ],
            order: [['id', 'DESC']]
          }
        ],
        order: [['id', 'DESC']]
      },
    ],
    where: { userId: userId },
    order: [['id', 'DESC']]
  });
  return postList;
};

const updateUser = async (profileUrl,userId) => {
  const update = await User.update(
      {
        profileurl:profileUrl,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  return update;
};

export { getUserData, createUser, getUserPost, updateUser }