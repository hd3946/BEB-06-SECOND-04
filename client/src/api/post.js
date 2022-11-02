// 로그인, 회원 가입, (ex) 회원 탈퇴
import { post } from "./index";

// 전체 글 목록 가져오기
function postListCall() {
  return post.get("list"); //http://localhost:3005/post/list
}

// 글 작성
function postWrite(postData) {
  return post.post("write", postData);
}

// 글 수정
function postUpdate(postData) {
  return post.post("edit", postData);
}

// 글 삭제
function postDelete(postData) {
  return post.post("delete", postData);
}

export { postListCall, postWrite, postUpdate, postDelete };
