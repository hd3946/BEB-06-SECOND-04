import { db, sequelize } from "../models/index.js";
const {  User, Comment, CommentLike } = db;

const getCommentList = async (postId) => {
    try {
        const result = await Comment.findAll({ 
            attributes: [['id', 'commentId'], 'content', 'createdAt', 'updatedAt', 'commenter', 'postId'], 
            include: 
            [{ model: User, 
              attributes: ['email', 'nickname', 'profileurl']
            },  
            { model: CommentLike, 
             // attributes: [ [ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
             include: [
               { model: User, 
               attributes: ['email', 'nickname', 'profileurl']}
             ],
             order: [['id', 'DESC']]
       
           }], 
            where: { postId },
            order: [['id', 'DESC']]
        });
        return result;
    } catch (error) {
        throw Error('Error Occur', e);
    }
}

const createComment = async (content, userId, postId) => {
    try {
        await Comment.create({
            content,
            commenter: userId,              //작성자
            postId,             //게시글 위치 (삭제된 게시글이면 에러발생)
        });
    } catch (error) {
        throw Error('Error Occur', e);
    } 
}

const updateComment = async (commentId, id, content) => {
  try {
    const data = await Comment.findOne({ where: { id: commentId, userId: id } });
    await data.update({ //update 날짜는 자동으로 변경
      content,
    });
  } catch (e) {
    throw Error('Error Occur', e);
  }
}

const deleteComment = async (commentId, id) => {
  const data = await Comment.findOne({ where: { id: commentId, userId: id } }); 
  data.destroy();
}

const countComment = async (userId, commentId) => {
    const result = {};
    try {
        const isLiked = await CommentLike.findAll({ 
            where: { LikeUSerId: userId, LikeCommentId: commentId }
        });
        if (isLiked.length === 0) {
            await CommentLike.create({
              LikeUserId: userId,
              LikeCommentId: commentId
            });
            const count = await CommentLike.findAll(({
              attributes: [[ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
              where: { LikeCommentId: commentId }
            }))
            result.count = count;
            result.status = true;
          } else {
            await CommentLike.destroy({ 
              where: {LikeUSerId: userId, LikeCommentId: commentId}
            })
            const count = await CommentLike.findAll(({
              attributes: [[ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
              where: { LikeCommentId: commentId }
            }))
            result.count = count;
            result.status = false;
          }
    } catch (error) {
        throw Error('Error Occur', e);
    }
}

export { getCommentList, createComment, updateComment, deleteComment, countComment }