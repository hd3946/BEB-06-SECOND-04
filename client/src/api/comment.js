import { comment } from "./index";

const commentListCall = (postId) => {
  return comment.get("list", postId);
};
const commentWrite = (postData) => {
  return comment.post("write", postData);
};
const commentUpdate = (commentData) => {
  return comment.post("edit", commentData);
};
const commentDelete = (commentId) => {
  return comment.post("delete", commentId);
};
const commentLike = (commentId) => {
  return comment.post("like", commentId);
};

export {
  commentListCall,
  commentWrite,
  commentUpdate,
  commentDelete,
  commentLike,
};
