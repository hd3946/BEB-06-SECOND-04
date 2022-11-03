import { db } from "../models/index.js";
const { User, Post, Comment } = db;

const getUserData = async (email, password) => {
    try{
        const data = await User.findOne({
            where: { email, password },
        });
        return data;
    }catch (e){
        throw Error('Error Occur', e);
    };
};

const createUser = async (email, nickname, password, address) => {
    try{
        const result = await User.create({
            email,
            nickname,
            password,
            address,
        });
        return result;
    }catch (e){
        throw Error('Error Occur', e);
    };
};

const getUserPost = async (userId) => {
    try{
      const postList = await Post.findAll({
        attributes: [
          ["id", "postId"],
          "title",
          "content",
          'profileurl',
          "createdAt",
          "updatedAt",
        ],
        include: [
          { model: User, attributes: ["email", "nickname", , 'profileurl'] },
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
                 attributes: ["email", "nickname"]},
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
        where: { userId: id },
        order: [['id', 'DESC']]
      });
          return postList;
    }catch (e){
        throw Error('Error while Paginating Users');
    };
};

const updateUser = async (userId) => {
    try{
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
    }catch (e){
        throw Error('Error Occur', e);
    };
};

export { getUserData, createUser, getUserPost, updateUser }