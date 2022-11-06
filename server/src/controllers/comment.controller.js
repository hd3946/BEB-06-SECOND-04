import {
  getCommentList,
  createComment,
  updateComment,
  deleteComment,
  countComment,
} from "../services/comment.service.js";

/* comment API */
//GET /list
const listComment = async (req, res, next) => {
  const postId = req.query.postId;
  if (!postId)
    return res.status(401).json({
      status: false,
      message: "input postId",
    });
  try {
    const comments = await getCommentList(postId);
    return res.status(200).json({
      status: true,
      message: "Success",
      comments, //최신댓글목록
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//POST /write
const writeComment = async (req, res, next) => {
  try {
    const { id } = req.cookies.loginData;
    const { postId, content } = req.body;
    console.log("유저 댓글 업로드", id);
    createComment(content, postId, id);

    return res.status(200).json({
      status: true,
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//POST /edit
const editComment = async (req, res, next) => {
  try {
    const { id } = req.cookies.loginData;
    const { commentId, content } = req.body;

    updateComment(commentId, id, content);

    return res.status(200).json({
      status: true,
      message: "edit success",
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      status: false,
      message: "Not Authorized",
    });
  }
};

//POST /delete
const deletedComment = async (req, res, next) => {
  try {
    const { id } = req.cookies.loginData;
    const { commentId } = req.body;
    await deleteComment(commentId, id);

    return res.status(200).json({
      status: true,
      message: "delete success",
    });
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Not Authorized",
    });
  }
};

//POST like/:commentId
const likeComment = async (req, res, next) => {
  try {
    const userId = req.cookies.loginData.id;
    const commentId = req.params.commentId; //작성되지않은 commentId일시 에러발생

    const data = await countComment(userId, commentId);
    if (data.status) {
      return res.status(200).json({
        status: true,
        message: "liked",
        count: data.count, //현재 코멘트 좋아요 갯수
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "cancel liked",
        count: data.count, //현재 코멘트 좋아요 갯수
      });
    }
  } catch (err) {
    next(err);
  }
};

export { listComment, writeComment, editComment, deletedComment, likeComment };
