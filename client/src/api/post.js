// 로그인, 회원 가입, (ex) 회원 탈퇴
import { post } from './index';

// 회원가입 API
function registerUser(userData) {
  return post.post('signup', userData);  // http://localhost:3005/post/signup
}

// 로그인 API
function loginUser(userData) {
  return post.post('signin', userData);  
}

// 로그아웃 API
function logoutUser() {
  return post.post('signout');
}

export { registerUser, loginUser, logoutUser };
