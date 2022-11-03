import { db } from "../models/index.js";
const { User, Post, Comment, PostLike, CommentLike } = db; 

const getPostList = async () => {
  try {
    const result = await Post.findAll({
      attributes: [['id', 'postId'], 'title', 'content', 'createdAt', 'updatedAt' ],
      include: 
      [
        { model: User, 
          attributes: ['email', 'nickname', 'profileurl'] 
        },
        { model: PostLike, 
          // attributes: [[ sequelize.fn('COUNT', 'id'), 'postLike' ]],
          include: [
            { model: User, 
            attributes: ['email', 'nickname', 'profileurl']}
          ],
          order: [['id', 'DESC']]
        },
        { model: Comment,
          attributes: [['id', 'commentId'], 'content', 'createdAt', 'updatedAt', 'commenter', 'postId'], 
          include: 
          [{ model: User, 
            attributes: ['email', 'nickname'] 
          },
          { model: CommentLike, 
            // attributes: [[ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
            include: [
              { model: User, 
              attributes: ['email', 'nickname', 'profileurl']}
            ],
            order: [['id', 'DESC']]
          }],
          order: [['id', 'DESC']]
        }
      ],
      order: [['id', 'DESC']]
    });
    return result;
  } catch (e) {
    throw Error('Error Occur', e);
  }
   
}

const createPost = async (title, content, img, userId) => {
  try {
    await Post.create({
      title,
      content,
      img,
      userId,
    }); 
  } catch (e) {
    throw Error('Error Occur', e);
  }
};

const deletePost = async (postId, id) => {
  try {
    const data = await Post.findOne({ where: { id: postId , userId: id } });
    data.destroy();
  } catch (error) {
    throw Error('Error Occur', e);
  }
}

const updatePost = async (postId, id, title, content) => {
  try {
      const data = await Post.findOne({ where: { id: postId, userId: id } });
      data.update({
        //update 날짜는 자동으로 변경
        title,
        content,
      });
  } catch (e) {
    throw Error('Error Occur', e);
  }
};

const countLike = async (userId, postId) => {
    const result = {};
    const isLiked = await PostLike.findAll({ 
        where: { LikeUSerId: userId, LikePostId: postId }
    })
    if (isLiked.length === 0) {
        await PostLike.create({
            LikeUserId: userId,
            LikePostId: postId
        });
        const count = await PostLike.findAll(({
            attributes: [[ sequelize.fn('COUNT', 'id'), 'postLike' ]],
            where: { LikePostId: postId }
        })); 
        result.count = count;
        result.status = true;
    }else{
        await PostLike.destroy({ 
            where: {LikeUSerId: userId, LikePostId: postId} 
        });
        const count = await PostLike.findAll(({
            attributes: [[ sequelize.fn('COUNT', 'id'), 'postLike' ]],
            where: { LikePostId: postId }
        })); 
        result.count = count;
        result.status = false;
    }
    return result;
}
 
export { getPostList, createPost, deletePost, updatePost, countLike }