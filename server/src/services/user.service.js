import { db } from "../models/index.js";
const { User, Post, PostLike, Comment, CommentLike } = db;

const getUserData = async (email, password) => {
    try {
        const data = await User.findOne({
            where: { email, password },
        });
      return data;
    } catch (e) {
      throw Error('Error Occur', e);
    };
};

const createUser = async (email, password, nickname, address) => {
    try {
        const result = await User.create({
            email,
            nickname,
            password,
            address,
        });
        return result;
    } catch (e) {
      throw Error('Error Occur.', e);
    };
};

const getUserPost = async (userId) => {
    try {
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
    } catch (e) {
      throw Error('Error while Paginating Users', e);
    };
};

const updateUser = async (profileUrl,userId) => {
    try {
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
    } catch (e){
        throw Error('Error Occur', e);
    };
};

export { getUserData, createUser, getUserPost, updateUser }