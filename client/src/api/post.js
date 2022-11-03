import { post } from "./index";

function postListCall() {
  return post.post("list"); //http://localhost:3005/post/list
}

function postWrite(postData) {
  return post.post("write", postData);
}

function postUpdate(postData) {
  return post.post("edit", postData);
}

function postDelete(postData) {
  return post.post("delete", postData);
}

const postLike = (postId) => {
  return post.post("like", postId);
};

export { postListCall, postWrite, postUpdate, postDelete, postLike };
