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
            include: [
              { model: User, attributes: ["email", "nickname"] },
              {
                model: Comment,
                attributes: [
                  ["id", "commentId"],
                  "content",
                  "createdAt",
                  "updatedAt",
                  "commenter",
                  "postId",
                ],
                include: { model: User, attributes: ["email", "nickname"] },
              },
            ],
            attributes: [
              ["id", "postId"],
              "title",
              "content",
              "img",
              "createdAt",
              "updatedAt",
            ],
            where: { userId: userId },
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